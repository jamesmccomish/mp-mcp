#!/usr/bin/env tsx
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from '../src/server.js';
import { type EvalTask, TASKS } from './tasks.js';

type ToolCallRecord = {
  name: string;
  input: unknown;
  ok: boolean;
  error_code?: string;
};

type TaskResult = {
  task: EvalTask;
  tool_calls: ToolCallRecord[];
  final_text: string;
  pass: boolean;
  notes: string[];
  input_tokens: number;
  output_tokens: number;
  duration_ms: number;
};

const MODEL = process.env.MP_MCP_EVAL_MODEL ?? 'claude-opus-4-7';
const JUDGE_MODEL = process.env.MP_MCP_JUDGE_MODEL ?? 'claude-haiku-4-5-20251001';
const MAX_TOOL_TURNS = 8;
const HERE = dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = resolve(HERE, 'reports');

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    process.stderr.write('ANTHROPIC_API_KEY is required to run evals.\n');
    process.exit(1);
  }
  const anthropic = new Anthropic({ apiKey });

  const server = createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  const mcpClient = new Client({ name: 'mp-mcp-evals', version: '0.0.0' });
  await mcpClient.connect(clientTransport);

  const { tools: serverTools } = await mcpClient.listTools();
  const anthropicTools: Anthropic.Tool[] = serverTools.map((t) => ({
    name: t.name,
    description: t.description ?? '',
    input_schema: t.inputSchema as Anthropic.Tool['input_schema'],
  }));

  const filter = process.argv[2];
  const tasks = filter ? TASKS.filter((t) => t.id === filter || t.category === filter) : TASKS;

  const results: TaskResult[] = [];
  for (const task of tasks) {
    process.stderr.write(`[eval] ${task.id} ${task.category} ...\n`);
    try {
      const result = await runOne(anthropic, mcpClient, anthropicTools, task);
      await grade(anthropic, task, result);
      results.push(result);
      process.stderr.write(
        `[eval] ${task.id} ${result.pass ? 'PASS' : 'FAIL'} — ${result.tool_calls.length} calls, ${result.input_tokens + result.output_tokens} tokens\n`,
      );
    } catch (error) {
      process.stderr.write(`[eval] ${task.id} ERRORED: ${String(error)}\n`);
    }
  }

  await mcpClient.close();
  await server.close();

  const report = renderReport(results);
  await mkdir(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const reportPath = resolve(REPORTS_DIR, `${stamp}.md`);
  await writeFile(reportPath, report, 'utf8');
  process.stderr.write(`[eval] wrote ${reportPath}\n`);
}

async function runOne(
  anthropic: Anthropic,
  mcp: Client,
  tools: Anthropic.Tool[],
  task: EvalTask,
): Promise<TaskResult> {
  const start = Date.now();
  const calls: ToolCallRecord[] = [];
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: task.prompt }];
  let inputTokens = 0;
  let outputTokens = 0;
  let finalText = '';

  for (let turn = 0; turn < MAX_TOOL_TURNS; turn += 1) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      tools,
      messages,
    });
    inputTokens += response.usage.input_tokens;
    outputTokens += response.usage.output_tokens;

    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
    );

    if (response.stop_reason !== 'tool_use' || toolUseBlocks.length === 0) {
      finalText = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n');
      break;
    }

    messages.push({ role: 'assistant', content: response.content });

    const toolResultBlocks: Anthropic.ToolResultBlockParam[] = [];
    for (const block of toolUseBlocks) {
      try {
        const result = await mcp.callTool({
          name: block.name,
          arguments: block.input as Record<string, unknown>,
        });
        const text = result.content
          .filter((c): c is { type: 'text'; text: string } => c.type === 'text')
          .map((c) => c.text)
          .join('\n');
        const parsed = safeParse(text);
        const isError = parsed && typeof parsed === 'object' && 'error' in (parsed as object);
        calls.push({
          name: block.name,
          input: block.input,
          ok: !isError,
          error_code: isError ? (parsed as { error: { code?: string } }).error.code : undefined,
        });
        toolResultBlocks.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: text,
          is_error: Boolean(isError),
        });
      } catch (error) {
        calls.push({ name: block.name, input: block.input, ok: false });
        toolResultBlocks.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: `Tool call failed: ${String(error)}`,
          is_error: true,
        });
      }
    }
    messages.push({ role: 'user', content: toolResultBlocks });
  }

  return {
    task,
    tool_calls: calls,
    final_text: finalText,
    pass: false,
    notes: [],
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    duration_ms: Date.now() - start,
  };
}

async function grade(anthropic: Anthropic, task: EvalTask, result: TaskResult): Promise<void> {
  const notes: string[] = [];

  const calledNames = result.tool_calls.map((c) => c.name);
  if (task.expected_tools) {
    const missing = task.expected_tools.filter((t) => !calledNames.includes(t));
    if (missing.length > 0) notes.push(`Missing expected tool(s): ${missing.join(', ')}`);
  }
  if (task.forbidden_tools) {
    const fired = task.forbidden_tools.filter((t) => calledNames.includes(t));
    if (fired.length > 0) notes.push(`Called forbidden tool(s): ${fired.join(', ')}`);
  }
  for (const needle of task.must_include ?? []) {
    if (!result.final_text.toLowerCase().includes(needle.toLowerCase())) {
      notes.push(`Final response missing required substring: "${needle}"`);
    }
  }
  for (const needle of task.must_not_include ?? []) {
    if (result.final_text.toLowerCase().includes(needle.toLowerCase())) {
      notes.push(`Final response contained forbidden substring: "${needle}"`);
    }
  }

  let judgeVerdict: 'pass' | 'fail' | null = null;
  if (task.judge) {
    const judged = await llmAsJudge(anthropic, task, result);
    judgeVerdict = judged.verdict;
    if (judged.reasoning) notes.push(`Judge: ${judged.reasoning}`);
  }

  result.notes = notes;
  result.pass = notes.length === 0 && judgeVerdict !== 'fail';
}

async function llmAsJudge(
  anthropic: Anthropic,
  task: EvalTask,
  result: TaskResult,
): Promise<{ verdict: 'pass' | 'fail'; reasoning: string }> {
  const judgePrompt = `\
You are grading an agent's response to a user question. The user asked:

  ${task.prompt}

The agent answered:

  ${result.final_text.slice(0, 4000)}

The pass criteria: ${task.judge?.criteria}

Reply with exactly one of:
  PASS — <one-sentence reason>
  FAIL — <one-sentence reason>
`;
  const response = await anthropic.messages.create({
    model: JUDGE_MODEL,
    max_tokens: 200,
    messages: [{ role: 'user', content: judgePrompt }],
  });
  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
  const verdict = text.trim().startsWith('PASS') ? 'pass' : 'fail';
  return { verdict, reasoning: text.trim().slice(0, 200) };
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function renderReport(results: TaskResult[]): string {
  const passed = results.filter((r) => r.pass).length;
  const totalIn = results.reduce((s, r) => s + r.input_tokens, 0);
  const totalOut = results.reduce((s, r) => s + r.output_tokens, 0);

  const toolStats = new Map<string, { count: number; errors: number }>();
  for (const r of results) {
    for (const c of r.tool_calls) {
      const stat = toolStats.get(c.name) ?? { count: 0, errors: 0 };
      stat.count += 1;
      if (!c.ok) stat.errors += 1;
      toolStats.set(c.name, stat);
    }
  }

  const stamp = new Date().toISOString();

  return `# mp-mcp eval report — ${stamp}

**Model:** ${MODEL}
**Tasks run:** ${results.length}
**Passed:** ${passed} / ${results.length} (${results.length === 0 ? 0 : Math.round((passed / results.length) * 100)}%)
**Tokens:** ${totalIn} in / ${totalOut} out

## Per-tool stats

| Tool | Calls | Errors |
|---|--:|--:|
${[...toolStats.entries()]
  .sort((a, b) => b[1].count - a[1].count)
  .map(([name, stat]) => `| \`${name}\` | ${stat.count} | ${stat.errors} |`)
  .join('\n')}

## Per-task results

${results
  .map(
    (r) => `### ${r.task.id} (${r.task.category}) — ${r.pass ? 'PASS' : 'FAIL'}

**Prompt:** ${r.task.prompt}

**Tool calls:** ${r.tool_calls.map((c) => `\`${c.name}\`${c.ok ? '' : ` (${c.error_code ?? 'ERR'})`}`).join(', ') || '(none)'}

**Tokens:** ${r.input_tokens} in / ${r.output_tokens} out — ${r.duration_ms}ms

${r.notes.length > 0 ? `**Notes:**\n${r.notes.map((n) => `- ${n}`).join('\n')}\n` : ''}
<details><summary>Final response</summary>

${r.final_text || '_(empty)_'}

</details>
`,
  )
  .join('\n')}
`;
}

main().catch((error: unknown) => {
  process.stderr.write(`[eval] fatal: ${String(error)}\n`);
  process.exit(1);
});

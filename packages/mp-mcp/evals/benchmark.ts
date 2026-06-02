#!/usr/bin/env tsx
/**
 * Token-spend benchmark. Runs a curated subset of eval tasks through two arms:
 *
 *   A. with_mcp  — the agent with the mp-mcp tools (in-memory server)
 *   B. baseline  — the agent with web search but NO MCP (or no tools at all,
 *                  via MP_MCP_BENCH_BASELINE=none)
 *
 * It accumulates the full, billed-equivalent token spend of each arm from 0 to
 * finish (the with-MCP arm prompt-caches the tool catalogue + system prompt, as
 * real MCP clients do), plus an LLM-as-judge accuracy verdict and each arm's
 * response text, and writes a comparison report to evals/reports/benchmark-<date>.md.
 *
 * Costs real Anthropic tokens. Run on demand, not in CI.
 *
 *   ANTHROPIC_API_KEY=... pnpm --filter mp-mcp bench
 *   ANTHROPIC_API_KEY=... pnpm --filter mp-mcp bench A2 C1   # specific task ids
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from '../src/server.js';
import { MODEL, judgeAnswer, safeParse } from './runner.js';
import { type EvalTask, TASKS } from './tasks.js';

// One representative data task per category (traps excluded — the MCP is
// intentionally unused there, so they do not measure its cost).
const BENCHMARK_TASK_IDS = ['A2', 'B1', 'C1', 'E2'];

const MAX_TOOL_TURNS = 8;
const WEB_SEARCH_MAX_USES = 5;
const BASELINE_MODE = process.env.MP_MCP_BENCH_BASELINE === 'none' ? 'none' : 'web';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = resolve(HERE, 'reports');

type ArmKind = 'with_mcp' | 'baseline';

type ArmResult = {
  arm: ArmKind;
  input_tokens: number;
  output_tokens: number;
  cache_creation: number;
  cache_read: number;
  // Billed-equivalent total: cache writes cost 1.25x and reads 0.1x of input.
  total_tokens: number;
  tool_calls: number;
  web_searches: number;
  final_text: string;
  duration_ms: number;
  judge: 'pass' | 'fail' | null;
  error?: string;
};

type Usage = { input: number; output: number; cacheCreation: number; cacheRead: number };

type BenchRow = { task: EvalTask; withMcp: ArmResult; baseline: ArmResult };

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    process.stderr.write('ANTHROPIC_API_KEY is required to run the benchmark.\n');
    process.exit(1);
  }
  const anthropic = new Anthropic({ apiKey });

  const server = createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  const mcpClient = new Client({ name: 'mp-mcp-bench', version: '0.0.0' });
  await mcpClient.connect(clientTransport);

  const { tools: serverTools } = await mcpClient.listTools();
  const anthropicTools: Anthropic.Tool[] = serverTools.map((t) => ({
    name: t.name,
    description: t.description ?? '',
    input_schema: t.inputSchema as Anthropic.Tool['input_schema'],
  }));
  // Surface the server instructions (citation contract) as the system prompt,
  // mirroring how real MCP clients connect.
  const instructions = mcpClient.getInstructions();

  const requested = process.argv.slice(2);
  const ids = requested.length > 0 ? requested : BENCHMARK_TASK_IDS;
  const tasks = ids
    .map((id) => TASKS.find((t) => t.id === id))
    .filter((t): t is EvalTask => Boolean(t));

  if (tasks.length === 0) {
    process.stderr.write(`No matching tasks for ids: ${ids.join(', ')}\n`);
    process.exit(1);
  }

  const rows: BenchRow[] = [];
  for (const task of tasks) {
    process.stderr.write(`[bench] ${task.id} ${task.category} — arm A (with MCP) ...\n`);
    const withMcp = await safely('with_mcp', () =>
      runWithMcp(anthropic, mcpClient, anthropicTools, task, instructions),
    );
    process.stderr.write(`[bench] ${task.id} ${task.category} — arm B (baseline) ...\n`);
    const baseline = await safely('baseline', () => runBaseline(anthropic, task));

    await gradeArm(anthropic, task, withMcp);
    await gradeArm(anthropic, task, baseline);

    rows.push({ task, withMcp, baseline });
    process.stderr.write(
      `[bench] ${task.id}: with_mcp ${withMcp.total_tokens} tok / baseline ${baseline.total_tokens} tok\n`,
    );
  }

  await mcpClient.close();
  await server.close();

  const report = renderReport(rows);
  await mkdir(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const reportPath = resolve(REPORTS_DIR, `benchmark-${stamp}.md`);
  await writeFile(reportPath, report, 'utf8');
  process.stderr.write(`[bench] wrote ${reportPath}\n`);
}

// Arm A: the agent with the MCP tools, executed through a client tool loop
// (mirrors evals/runner.ts runOne).
async function runWithMcp(
  anthropic: Anthropic,
  mcp: Client,
  tools: Anthropic.Tool[],
  task: EvalTask,
  instructions?: string,
): Promise<ArmResult> {
  const start = Date.now();
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: task.prompt }];

  // Prompt-cache the static prefix (tool catalogue + system instructions) so
  // turns 2+ read it at ~10% instead of re-billing the full schemas each turn —
  // this is how real MCP clients are billed. cache_control on the last tool
  // caches the whole tools block.
  const cachedTools = tools.map((t, i) =>
    i === tools.length - 1 ? { ...t, cache_control: { type: 'ephemeral' as const } } : t,
  );
  const system: Anthropic.TextBlockParam[] | undefined = instructions
    ? [{ type: 'text', text: instructions, cache_control: { type: 'ephemeral' } }]
    : undefined;

  let inputTokens = 0;
  let outputTokens = 0;
  let cacheCreation = 0;
  let cacheRead = 0;
  let toolCalls = 0;
  let finalText = '';

  for (let turn = 0; turn < MAX_TOOL_TURNS; turn += 1) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      tools: cachedTools,
      messages,
      ...(system ? { system } : {}),
    });
    inputTokens += response.usage.input_tokens;
    outputTokens += response.usage.output_tokens;
    cacheCreation += cacheCreationTokens(response.usage);
    cacheRead += cacheReadTokens(response.usage);

    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
    );

    if (response.stop_reason !== 'tool_use' || toolUseBlocks.length === 0) {
      finalText = textOf(response);
      break;
    }

    messages.push({ role: 'assistant', content: response.content });

    const toolResultBlocks: Anthropic.ToolResultBlockParam[] = [];
    for (const block of toolUseBlocks) {
      toolCalls += 1;
      try {
        const result = await mcp.callTool({
          name: block.name,
          arguments: block.input as Record<string, unknown>,
        });
        const text = (result.content as Array<{ type: string; text?: string }>)
          .filter((c) => c.type === 'text')
          .map((c) => c.text ?? '')
          .join('\n');
        toolResultBlocks.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: text,
          is_error: isToolError(text),
        });
      } catch (error) {
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

  return arm(
    'with_mcp',
    { input: inputTokens, output: outputTokens, cacheCreation, cacheRead },
    { tool_calls: toolCalls, final_text: finalText, duration_ms: Date.now() - start },
  );
}

// Arm B: the agent with web search (server-side tool) but no MCP, or no tools
// at all when MP_MCP_BENCH_BASELINE=none.
async function runBaseline(anthropic: Anthropic, task: EvalTask): Promise<ArmResult> {
  const start = Date.now();
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: task.prompt }];
  const tools =
    BASELINE_MODE === 'web'
      ? ([
          { type: 'web_search_20250305', name: 'web_search', max_uses: WEB_SEARCH_MAX_USES },
        ] as unknown as Anthropic.ToolUnion[])
      : undefined;

  let inputTokens = 0;
  let outputTokens = 0;
  let webSearches = 0;
  let finalText = '';

  for (let turn = 0; turn < MAX_TOOL_TURNS; turn += 1) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages,
      ...(tools ? { tools } : {}),
    });
    inputTokens += response.usage.input_tokens;
    outputTokens += response.usage.output_tokens;
    webSearches += webSearchRequests(response.usage);

    // Server-side tools resolve within the API; a long sequence may pause the
    // turn and ask us to continue with the same messages.
    if (response.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: response.content });
      continue;
    }
    finalText = textOf(response);
    break;
  }

  return arm(
    'baseline',
    { input: inputTokens, output: outputTokens, cacheCreation: 0, cacheRead: 0 },
    { web_searches: webSearches, final_text: finalText, duration_ms: Date.now() - start },
  );
}

async function gradeArm(anthropic: Anthropic, task: EvalTask, result: ArmResult): Promise<void> {
  if (result.error || !task.judge || !result.final_text.trim()) return;
  const { verdict } = await judgeAnswer(
    anthropic,
    task.prompt,
    task.judge.criteria,
    result.final_text,
  );
  result.judge = verdict;
}

async function safely(kind: ArmKind, run: () => Promise<ArmResult>): Promise<ArmResult> {
  try {
    return await run();
  } catch (error) {
    return {
      arm: kind,
      input_tokens: 0,
      output_tokens: 0,
      cache_creation: 0,
      cache_read: 0,
      total_tokens: 0,
      tool_calls: 0,
      web_searches: 0,
      final_text: '',
      duration_ms: 0,
      judge: null,
      error: String(error),
    };
  }
}

function arm(
  kind: ArmKind,
  usage: Usage,
  extra: Partial<ArmResult> & { final_text: string; duration_ms: number },
): ArmResult {
  return {
    arm: kind,
    input_tokens: usage.input,
    output_tokens: usage.output,
    cache_creation: usage.cacheCreation,
    cache_read: usage.cacheRead,
    total_tokens: billedTotal(usage),
    tool_calls: extra.tool_calls ?? 0,
    web_searches: extra.web_searches ?? 0,
    final_text: extra.final_text,
    duration_ms: extra.duration_ms,
    judge: null,
  };
}

// What you actually pay: uncached input + output at 1x, cache writes at 1.25x,
// cache reads at 0.1x.
function billedTotal(usage: Usage): number {
  return Math.round(
    usage.input + usage.output + 1.25 * usage.cacheCreation + 0.1 * usage.cacheRead,
  );
}

// Tokens this arm would have cost with no caching (every turn re-bills the
// prefix at 1x) — used to show the savings caching provides.
function uncachedEquivalent(r: ArmResult): number {
  return r.input_tokens + r.output_tokens + r.cache_creation + r.cache_read;
}

function cacheCreationTokens(usage: Anthropic.Usage): number {
  return (
    (usage as { cache_creation_input_tokens?: number | null }).cache_creation_input_tokens ?? 0
  );
}

function cacheReadTokens(usage: Anthropic.Usage): number {
  return (usage as { cache_read_input_tokens?: number | null }).cache_read_input_tokens ?? 0;
}

function textOf(response: Anthropic.Message): string {
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n');
}

function isToolError(text: string): boolean {
  const parsed = safeParse(text);
  return Boolean(parsed && typeof parsed === 'object' && 'error' in (parsed as object));
}

function webSearchRequests(usage: Anthropic.Usage): number {
  const serverToolUse = (usage as { server_tool_use?: { web_search_requests?: number } | null })
    .server_tool_use;
  return serverToolUse?.web_search_requests ?? 0;
}

function renderReport(rows: BenchRow[]): string {
  const totals = rows.reduce(
    (acc, r) => {
      acc.mcp += r.withMcp.total_tokens;
      acc.baseline += r.baseline.total_tokens;
      return acc;
    },
    { mcp: 0, baseline: 0 },
  );
  const ratio = totals.baseline === 0 ? 'n/a' : (totals.mcp / totals.baseline).toFixed(2);
  const stamp = new Date().toISOString();
  const baselineLabel = BASELINE_MODE === 'web' ? 'web search, no MCP' : 'no tools';

  const uncachedMcp = rows.reduce((s, r) => s + uncachedEquivalent(r.withMcp), 0);

  const perTask = rows
    .map((r) => {
      const delta = r.withMcp.total_tokens - r.baseline.total_tokens;
      const uncached = uncachedEquivalent(r.withMcp);
      return `### ${r.task.id} (${r.task.category})

**Prompt:** ${r.task.prompt}

| Arm | In (uncached) | Cache write | Cache read | Out | Billed total | Calls / searches | Accuracy |
|---|--:|--:|--:|--:|--:|--:|---|
| with MCP | ${r.withMcp.input_tokens} | ${r.withMcp.cache_creation} | ${r.withMcp.cache_read} | ${r.withMcp.output_tokens} | ${r.withMcp.total_tokens} | ${r.withMcp.tool_calls} calls | ${verdict(r.withMcp)} |
| baseline (${baselineLabel}) | ${r.baseline.input_tokens} | — | — | ${r.baseline.output_tokens} | ${r.baseline.total_tokens} | ${r.baseline.web_searches} searches | ${verdict(r.baseline)} |

**Billed delta (MCP − baseline):** ${delta >= 0 ? '+' : ''}${delta} tokens. With MCP this task billed ${r.withMcp.total_tokens}; without prompt caching it would have been ~${uncached}.${errors(r)}

<details><summary>with MCP response</summary>

${r.withMcp.final_text || '_(empty)_'}

</details>

<details><summary>baseline response</summary>

${r.baseline.final_text || '_(empty)_'}

</details>`;
    })
    .join('\n\n');

  return `# mp-mcp token-spend benchmark — ${stamp}

**Model:** ${MODEL}
**Baseline:** ${baselineLabel}
**Tasks:** ${rows.length}

## Totals (billed-equivalent tokens)

| | With MCP | Baseline |
|---|--:|--:|
| Billed tokens | ${totals.mcp} | ${totals.baseline} |

**Overall ratio (MCP ÷ baseline):** ${ratio}×

With MCP, prompt caching brought the billed total to ${totals.mcp}; without caching
it would have been ~${uncachedMcp} tokens.

Notes:
- "Billed total" = uncached input + output at 1x, cache writes at 1.25x, cache
  reads at 0.1x — what you actually pay. Arm A prompt-caches the tool catalogue +
  system instructions, so turns 2+ read the prefix cheaply instead of re-billing
  every tool schema.
- The MCP server \`instructions\` (citation contract) ARE injected as the system
  prompt for arm A, mirroring real MCP clients.
- Web searches are billed per request separately from tokens, so they are shown
  in the calls/searches column and not folded into the token totals.

## Per-task

${perTask}
`;
}

function verdict(result: ArmResult): string {
  if (result.error) return `ERROR: ${result.error.slice(0, 80)}`;
  if (result.judge === null) return 'n/a';
  return result.judge === 'pass' ? 'PASS' : 'FAIL';
}

function errors(row: BenchRow): string {
  const notes: string[] = [];
  if (row.withMcp.error) notes.push(`with MCP errored: ${row.withMcp.error.slice(0, 120)}`);
  if (row.baseline.error) notes.push(`baseline errored: ${row.baseline.error.slice(0, 120)}`);
  return notes.length > 0 ? `\n\n**Errors:**\n${notes.map((n) => `- ${n}`).join('\n')}` : '';
}

export { BENCHMARK_TASK_IDS };

// Only run when executed directly, not when imported (e.g. by the unit test).
const invokedDirectly =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1] as string).href;

if (invokedDirectly) {
  main().catch((error: unknown) => {
    process.stderr.write(`[bench] fatal: ${String(error)}\n`);
    process.exit(1);
  });
}

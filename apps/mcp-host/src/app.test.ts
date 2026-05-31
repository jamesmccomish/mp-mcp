import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { app } from './app.js';

const TOOL_NAMES = [
  'parliament_ping',
  'parliament_find_member',
  'parliament_find_constituency',
  'parliament_member_overview',
  'parliament_member_voting_history',
  'parliament_search_hansard',
  'parliament_get_debate',
  'parliament_topic_tracker',
  'parliament_get_division',
  'parliament_member_interests',
  'parliament_get_committee',
];

function mcpRequest(body: unknown): Request {
  return new Request('http://localhost/mcp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify(body),
  });
}

async function parseSse(res: Response): Promise<unknown> {
  const text = await res.text();
  const contentType = res.headers.get('content-type') ?? '';
  let parsed: unknown;
  if (contentType.includes('text/event-stream')) {
    const dataLines = text
      .split('\n')
      .filter((l) => l.startsWith('data:'))
      .map((l) => l.slice('data:'.length).trim());
    const last = dataLines[dataLines.length - 1];
    if (!last) throw new Error('No data line found in SSE response');
    parsed = JSON.parse(last);
  } else {
    parsed = JSON.parse(text);
  }
  // Surface a JSON-RPC error response as a clear failure rather than a TypeError
  // when a later assertion reaches into a missing `result`.
  if (parsed && typeof parsed === 'object' && 'error' in parsed) {
    throw new Error(
      `JSON-RPC error response: ${JSON.stringify((parsed as { error: unknown }).error)}`,
    );
  }
  return parsed;
}

describe('mcp-host', () => {
  it('landing page (public/index.html) names /mcp and carries OPL', () => {
    const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
    expect(html).toContain('/mcp');
    expect(html).toContain('Open Parliament Licence v3.0');
  });

  it('GET /health returns ok', async () => {
    const res = await app.fetch(new Request('http://localhost/health'));
    expect(res.status).toBe(200);
    const json = (await res.json()) as { status: string };
    expect(json.status).toBe('ok');
  });

  it('tools/list returns all 11 tools', async () => {
    const res = await app.fetch(
      mcpRequest({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
    );
    expect(res.status).toBe(200);
    const parsed = (await parseSse(res)) as {
      result: { tools: Array<{ name: string }> };
    };
    const names = parsed.result.tools.map((t) => t.name);
    expect(names).toHaveLength(11);
    expect(names).toEqual(expect.arrayContaining(TOOL_NAMES));
  });

  it('initialize carries OPL instructions', async () => {
    const res = await app.fetch(
      mcpRequest({
        jsonrpc: '2.0',
        id: 2,
        method: 'initialize',
        params: {
          protocolVersion: '2025-06-18',
          capabilities: {},
          clientInfo: { name: 'test', version: '0' },
        },
      }),
    );
    expect(res.status).toBe(200);
    const parsed = (await parseSse(res)) as { result: { instructions: string } };
    expect(parsed.result.instructions).toContain('Open Parliament Licence v3.0');
  });
});

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createServer } from '../../src/server.js';

describe('mp-mcp server (in-memory)', () => {
  let client: Client;
  let serverClose: () => Promise<void>;

  beforeEach(async () => {
    const server = createServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    client = new Client({ name: 'mp-mcp-test', version: '0.0.0' });
    await client.connect(clientTransport);
    serverClose = async () => {
      await server.close();
    };
  });

  afterEach(async () => {
    await client.close();
    await serverClose();
  });

  it('advertises server instructions including the citation contract', () => {
    const instructions = client.getInstructions();
    expect(instructions).toBeDefined();
    expect(instructions).toMatch(/cite/i);
    expect(instructions).toMatch(/Open Parliament Licence/);
  });

  it('lists parliament_ping among its tools', async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name);
    expect(names).toContain('parliament_ping');
  });

  it('registers Tier 1 tools with intent-led names', async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name);
    expect(names).toEqual(
      expect.arrayContaining(['parliament_find_member', 'parliament_find_constituency']),
    );
  });

  it('registers all 11 firm tools', async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual(
      [
        'parliament_find_constituency',
        'parliament_find_member',
        'parliament_get_committee',
        'parliament_get_debate',
        'parliament_get_division',
        'parliament_member_interests',
        'parliament_member_overview',
        'parliament_member_voting_history',
        'parliament_ping',
        'parliament_search_divisions',
        'parliament_search_hansard',
        'parliament_topic_tracker',
      ].sort(),
    );
  });

  it('registers all four prompts and renders their text on request', async () => {
    const { prompts } = await client.listPrompts();
    const promptNames = prompts.map((p) => p.name).sort();
    expect(promptNames).toEqual([
      'draft-constituent-letter',
      'mp-report-card',
      'topic-tracker',
      'vote-explainer',
    ]);

    const result = await client.getPrompt({
      name: 'mp-report-card',
      arguments: { postcode_or_name: 'SW1A 0AA' },
    });
    const first = result.messages[0];
    expect(first?.role).toBe('user');
    expect((first?.content as { text: string }).text).toContain('parliament_find_member');
    expect((first?.content as { text: string }).text).toContain('SW1A 0AA');
  });

  it('returns the canned response for parliament_ping', async () => {
    const result = await client.callTool({ name: 'parliament_ping', arguments: {} });
    const content = result.content as Array<{ type: string; text: string }>;
    expect(content[0]?.type).toBe('text');
    expect(JSON.parse(content[0]?.text ?? '')).toEqual({ ok: true, sources: [] });
  });
});

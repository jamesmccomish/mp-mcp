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

  it('returns the canned response for parliament_ping', async () => {
    const result = await client.callTool({ name: 'parliament_ping', arguments: {} });
    const content = result.content as Array<{ type: string; text: string }>;
    expect(content[0]?.type).toBe('text');
    expect(JSON.parse(content[0]?.text ?? '')).toEqual({ ok: true, sources: [] });
  });
});

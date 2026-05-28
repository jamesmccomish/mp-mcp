import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const BIN = resolve(__dirname, '../../dist/stdio.js');

describe('stdio binary', () => {
  it('initialises over stdio JSON-RPC without ESM cycle errors', async () => {
    const child = spawn('node', [BIN], { stdio: ['pipe', 'pipe', 'pipe'] });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    child.stdout.on('data', (b: Buffer) => stdoutChunks.push(b));
    child.stderr.on('data', (b: Buffer) => stderrChunks.push(b));

    const init = {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'stdio-bin-test', version: '0.0.0' },
      },
    };
    child.stdin.write(`${JSON.stringify(init)}\n`);

    const exitCode: number | null = await new Promise((res) => {
      const timer = setTimeout(() => {
        child.kill();
        res(null);
      }, 2000);
      child.on('exit', (code) => {
        clearTimeout(timer);
        res(code);
      });
    });

    const stdout = Buffer.concat(stdoutChunks).toString('utf8');
    const stderr = Buffer.concat(stderrChunks).toString('utf8');

    expect(stderr).not.toMatch(/ReferenceError/);
    expect(stderr).not.toMatch(/Cannot access .* before initialization/);
    expect(stdout).toContain('"jsonrpc"');
    expect(stdout).toContain('"id":1');
    expect(exitCode).toBeNull();
  });
});

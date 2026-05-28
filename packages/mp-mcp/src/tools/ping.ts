import { z } from 'zod';

export const PingInputSchema = z.object({});
export type PingInput = z.infer<typeof PingInputSchema>;

export type PingResponse = {
  ok: true;
  sources: Array<{ title: string; url: string }>;
};

export function ping(_input: PingInput): PingResponse {
  return { ok: true, sources: [] };
}

export const pingToolDefinition = {
  name: 'parliament_ping',
  description:
    'Health check. Returns { ok: true, sources: [] }. ' +
    'Use only to verify the MCP server is reachable; do not call it to answer user questions.',
  inputSchema: PingInputSchema,
  handler: ping,
} as const;

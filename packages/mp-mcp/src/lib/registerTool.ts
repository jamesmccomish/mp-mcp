import { createHash, randomUUID } from 'node:crypto';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { z } from 'zod';
import { serializeError } from './errors.js';
import { logger } from './logger.js';

export type ToolDefinition<S extends z.ZodObject<z.ZodRawShape>, R> = {
  name: string;
  description: string;
  inputSchema: S;
  handler: (input: z.infer<S>) => R | Promise<R>;
};

export function registerTool<S extends z.ZodObject<z.ZodRawShape>, R>(
  server: McpServer,
  def: ToolDefinition<S, R>,
): void {
  server.registerTool(
    def.name,
    { description: def.description, inputSchema: def.inputSchema.shape },
    async (input: unknown) => {
      // request_id + tool ride along on every line for this call via the child logger.
      const log = logger.child({ request_id: randomUUID(), tool: def.name });
      const startedAt = Date.now();
      try {
        const parsed = def.inputSchema.parse(input);
        log.info({ input_hash: inputHash(parsed) }, 'tool call start');
        const result = await def.handler(parsed);
        log.info({ duration_ms: Date.now() - startedAt, success: true }, 'tool call finish');
        return jsonContent(result);
      } catch (error) {
        log.warn(
          { duration_ms: Date.now() - startedAt, success: false, error: errorForLog(error) },
          'tool error',
        );
        return { isError: true, ...jsonContent(serializeError(error)) };
      }
    },
  );
}

function jsonContent(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value) }] };
}

function errorForLog(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { value: String(error) };
}

// Identifies a call by its arguments without logging PII-bearing raw input.
function inputHash(input: unknown): string {
  return createHash('sha256').update(JSON.stringify(input)).digest('hex').slice(0, 16);
}

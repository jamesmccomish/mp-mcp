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
  server.tool(def.name, def.description, def.inputSchema.shape, async (input: unknown) => {
    try {
      const parsed = def.inputSchema.parse(input);
      const result = await def.handler(parsed);
      return {
        content: [{ type: 'text', text: JSON.stringify(result) }],
      };
    } catch (error) {
      logger.warn({ tool: def.name, error: errorForLog(error) }, 'tool error');
      return {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify(serializeError(error)) }],
      };
    }
  });
}

function errorForLog(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { value: String(error) };
}

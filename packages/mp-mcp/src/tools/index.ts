import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { pingToolDefinition } from './ping.js';

export function registerTools(server: McpServer): void {
  server.tool(
    pingToolDefinition.name,
    pingToolDefinition.description,
    pingToolDefinition.inputSchema.shape,
    async () => {
      const result = pingToolDefinition.handler({});
      return {
        content: [{ type: 'text', text: JSON.stringify(result) }],
      };
    },
  );
}

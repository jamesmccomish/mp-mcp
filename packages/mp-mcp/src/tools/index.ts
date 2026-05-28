import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTool } from '../lib/registerTool.js';
import { findConstituencyToolDefinition } from './findConstituency.js';
import { findMemberToolDefinition } from './findMember.js';
import { getDebateToolDefinition } from './getDebate.js';
import { memberOverviewToolDefinition } from './memberOverview.js';
import { memberVotingHistoryToolDefinition } from './memberVotingHistory.js';
import { pingToolDefinition } from './ping.js';
import { searchHansardToolDefinition } from './searchHansard.js';
import { topicTrackerToolDefinition } from './topicTracker.js';

export function registerTools(server: McpServer): void {
  server.tool(
    pingToolDefinition.name,
    pingToolDefinition.description,
    pingToolDefinition.inputSchema.shape,
    async () => {
      const result = pingToolDefinition.handler({});
      return { content: [{ type: 'text', text: JSON.stringify(result) }] };
    },
  );

  registerTool(server, findMemberToolDefinition);
  registerTool(server, findConstituencyToolDefinition);
  registerTool(server, memberOverviewToolDefinition);
  registerTool(server, memberVotingHistoryToolDefinition);
  registerTool(server, searchHansardToolDefinition);
  registerTool(server, getDebateToolDefinition);
  registerTool(server, topicTrackerToolDefinition);
}

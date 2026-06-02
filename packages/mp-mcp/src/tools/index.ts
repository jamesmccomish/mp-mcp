import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTool } from '../lib/registerTool.js';
import { findConstituencyToolDefinition } from './findConstituency.js';
import { findMemberToolDefinition } from './findMember.js';
import { getBillToolDefinition } from './getBill.js';
import { getCommitteeToolDefinition } from './getCommittee.js';
import { getDebateToolDefinition } from './getDebate.js';
import { getDivisionToolDefinition } from './getDivision.js';
import { getElectionResultsToolDefinition } from './getElectionResults.js';
import { getMinisterialRolesToolDefinition } from './getMinisterialRoles.js';
import { getStateOfPartiesToolDefinition } from './getStateOfParties.js';
import { memberInterestsToolDefinition } from './memberInterests.js';
import { memberOverviewToolDefinition } from './memberOverview.js';
import { memberVotingHistoryToolDefinition } from './memberVotingHistory.js';
import { pingToolDefinition } from './ping.js';
import { searchDivisionsToolDefinition } from './searchDivisions.js';
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
  registerTool(server, searchDivisionsToolDefinition);
  registerTool(server, getDivisionToolDefinition);
  registerTool(server, memberInterestsToolDefinition);
  registerTool(server, getCommitteeToolDefinition);
  registerTool(server, getBillToolDefinition);
  registerTool(server, getStateOfPartiesToolDefinition);
  registerTool(server, getMinisterialRolesToolDefinition);
  registerTool(server, getElectionResultsToolDefinition);
}

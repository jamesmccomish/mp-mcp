import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PACKAGE_NAME, PACKAGE_VERSION } from './config.js';
import { registerPrompts } from './prompts/index.js';
import { registerTools } from './tools/index.js';

export const SERVER_VERSION = PACKAGE_VERSION;

const SERVER_INSTRUCTIONS = `\
This MCP exposes UK Parliament data through intent-led tools.

Citation contract — every tool response includes a \`sources\` array of
parliament.uk and hansard.parliament.uk URLs. When you make any factual
claim about an MP, vote, debate, bill, committee, or written question,
cite the corresponding URL inline in your response to the user.

Data is provided under the Open Parliament Licence v3.0. When this MCP's
output is surfaced to end users, attribute as: "Contains Parliamentary
information licensed under the Open Parliament Licence v3.0."
`;

export function createServer(): McpServer {
  const server = new McpServer(
    { name: PACKAGE_NAME, version: PACKAGE_VERSION },
    { instructions: SERVER_INSTRUCTIONS },
  );
  registerTools(server);
  registerPrompts(server);
  return server;
}

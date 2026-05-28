import { z } from 'zod';

const ConfigSchema = z.object({
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  userAgentSuffix: z.string().default(''),
  fixtureDir: z.string().default('./fixtures'),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return ConfigSchema.parse({
    logLevel: env.MP_MCP_LOG_LEVEL,
    userAgentSuffix: env.MP_MCP_USER_AGENT_SUFFIX,
    fixtureDir: env.MP_MCP_FIXTURE_DIR,
  });
}

export const PACKAGE_NAME = 'mp-mcp';
export const PACKAGE_VERSION = '0.0.0';
export const REPO_URL = 'https://github.com/jamesmccomish/mp-mcp';

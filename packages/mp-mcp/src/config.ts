import { z } from 'zod';

const ConfigSchema = z.object({
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  userAgentSuffix: z.string().default(''),
  fixtureDir: z.string().default('./fixtures'),
  upstreamTimeoutMs: z.coerce.number().int().min(1000).max(30_000).default(4000),
  upstreamMaxAttempts: z.coerce.number().int().min(1).max(5).default(2),
  upstreamBaseBackoffMs: z.coerce.number().int().min(0).max(5000).default(200),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return ConfigSchema.parse({
    logLevel: env.MP_MCP_LOG_LEVEL,
    userAgentSuffix: env.MP_MCP_USER_AGENT_SUFFIX,
    fixtureDir: env.MP_MCP_FIXTURE_DIR,
    upstreamTimeoutMs: env.MP_MCP_UPSTREAM_TIMEOUT_MS,
    upstreamMaxAttempts: env.MP_MCP_UPSTREAM_MAX_ATTEMPTS,
    upstreamBaseBackoffMs: env.MP_MCP_UPSTREAM_BASE_BACKOFF_MS,
  });
}

export const PACKAGE_NAME = 'mp-mcp';
export const PACKAGE_VERSION = '0.0.0';
export const REPO_URL = 'https://github.com/jamesmccomish/mp-mcp';

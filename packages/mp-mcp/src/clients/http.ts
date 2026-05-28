import { Agent, setGlobalDispatcher, fetch as undiciFetch } from 'undici';
import { PACKAGE_NAME, PACKAGE_VERSION, REPO_URL, loadConfig } from '../config.js';
import { ParliamentToolError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 250;

const sharedAgent = new Agent({
  keepAliveTimeout: 30_000,
  keepAliveMaxTimeout: 60_000,
  connections: 32,
});

setGlobalDispatcher(sharedAgent);

const config = loadConfig();
const baseUserAgent = `${PACKAGE_NAME}/${PACKAGE_VERSION} (+${REPO_URL})`;
const userAgent = config.userAgentSuffix
  ? `${baseUserAgent} ${config.userAgentSuffix}`
  : baseUserAgent;

export type RequestOptions = {
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function getJson<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const finalUrl = options.query ? appendQuery(url, options.query) : url;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);
    const signal = options.signal
      ? mergeSignals(options.signal, controller.signal)
      : controller.signal;
    try {
      const response = await undiciFetch(finalUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'user-agent': userAgent,
          ...options.headers,
        },
        signal,
      });

      if (!response.ok) {
        if (shouldRetryStatus(response.status) && attempt < MAX_ATTEMPTS) {
          lastError = upstreamError(response.status, response.statusText, finalUrl);
          await sleep(backoff(attempt));
          continue;
        }
        throw upstreamError(response.status, response.statusText, finalUrl);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (!isRetryable(error) || attempt >= MAX_ATTEMPTS) {
        throw toToolError(error, finalUrl);
      }
      logger.debug({ url: finalUrl, attempt, error: serializeForLog(error) }, 'http retry');
      await sleep(backoff(attempt));
    } finally {
      clearTimeout(timeoutHandle);
    }
  }

  throw toToolError(lastError, finalUrl);
}

function appendQuery(
  url: string,
  query: Record<string, string | number | boolean | undefined>,
): string {
  const u = new URL(url);
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    u.searchParams.set(key, String(value));
  }
  return u.toString();
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

function isRetryable(error: unknown): boolean {
  if (error instanceof ParliamentToolError) {
    return error.code === 'UPSTREAM_UNAVAILABLE' || error.code === 'UPSTREAM_TIMEOUT';
  }
  if (error instanceof Error) {
    const name = error.name;
    const code = (error as { code?: string }).code;
    return (
      name === 'AbortError' ||
      name === 'TimeoutError' ||
      code === 'ECONNRESET' ||
      code === 'ENOTFOUND' ||
      code === 'ETIMEDOUT' ||
      code === 'UND_ERR_SOCKET'
    );
  }
  return false;
}

function upstreamError(status: number, statusText: string, url: string): ParliamentToolError {
  return new ParliamentToolError(
    'UPSTREAM_UNAVAILABLE',
    `Upstream responded ${status} ${statusText} for ${url}.`,
    'Parliament APIs occasionally return transient errors. Retry once; if persistent, try a sibling tool or narrower query.',
  );
}

function toToolError(error: unknown, url: string): ParliamentToolError {
  if (error instanceof ParliamentToolError) return error;
  const name = error instanceof Error ? error.name : 'Error';
  if (name === 'AbortError' || name === 'TimeoutError') {
    return new ParliamentToolError(
      'UPSTREAM_TIMEOUT',
      `Request timed out: ${url}.`,
      'The upstream API is slow. Retry once, or narrow the query (smaller date range, fewer results).',
    );
  }
  const message = error instanceof Error ? error.message : String(error);
  return new ParliamentToolError(
    'UPSTREAM_UNAVAILABLE',
    `Network error contacting upstream: ${message}.`,
    "Parliament's APIs are temporarily unreachable. Retry in 30 seconds.",
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoff(attempt: number): number {
  return BASE_BACKOFF_MS * 2 ** (attempt - 1);
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  const controller = new AbortController();
  const onAbort = (): void => controller.abort();
  if (a.aborted || b.aborted) controller.abort();
  a.addEventListener('abort', onAbort, { once: true });
  b.addEventListener('abort', onAbort, { once: true });
  return controller.signal;
}

function serializeForLog(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { value: String(error) };
}

export const __testing__ = {
  userAgent,
  shouldRetryStatus,
  isRetryable,
};

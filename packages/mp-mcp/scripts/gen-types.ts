#!/usr/bin/env tsx
/**
 * Fetch UK Parliament OpenAPI specs and emit TypeScript types into
 * `src/generated/`. The output is checked in so the build is reproducible
 * without network access.
 *
 * Run `pnpm gen:types` to refresh. Endpoints sourced from
 * https://developer.parliament.uk/.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';
// @ts-expect-error — swagger2openapi has no published types
import { convertObj } from 'swagger2openapi';

type Spec = {
  name: string;
  url: string;
};

const SPECS: Spec[] = [
  { name: 'members', url: 'https://members-api.parliament.uk/swagger/v1/swagger.json' },
  { name: 'hansard', url: 'https://hansard-api.parliament.uk/swagger/docs/v1' },
  { name: 'commons-votes', url: 'https://commonsvotes-api.parliament.uk/swagger/docs/v1' },
  { name: 'lords-votes', url: 'https://lordsvotes-api.parliament.uk/swagger/v1/swagger.json' },
  { name: 'bills', url: 'https://bills-api.parliament.uk/swagger/v1/swagger.json' },
  { name: 'committees', url: 'https://committees-api.parliament.uk/swagger/v1/swagger.json' },
  {
    name: 'written-questions',
    url: 'https://questions-statements-api.parliament.uk/swagger/v1/swagger.json',
  },
  { name: 'interests', url: 'https://interests-api.parliament.uk/swagger/v1/swagger.json' },
];

const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(HERE, '..', 'src', 'generated');

async function fetchAsOpenApi3(url: string): Promise<object> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}`);
  }
  const raw = (await response.json()) as Record<string, unknown>;
  if (typeof raw.swagger === 'string' && raw.swagger.startsWith('2.')) {
    const converted = (await convertObj(raw, { patch: true, warnOnly: true })) as {
      openapi: object;
    };
    return converted.openapi;
  }
  return raw;
}

async function generate(spec: Spec): Promise<void> {
  process.stderr.write(`[gen-types] ${spec.name}: fetching ${spec.url}\n`);
  const openApi3 = await fetchAsOpenApi3(spec.url);
  const ast = await openapiTS(openApi3 as Parameters<typeof openapiTS>[0]);
  const contents = `/* Auto-generated from ${spec.url}. Do not edit by hand. */\n${astToString(ast)}\n`;
  const outPath = resolve(OUTPUT_DIR, `${spec.name}.d.ts`);
  await writeFile(outPath, contents, 'utf8');
  process.stderr.write(`[gen-types] ${spec.name}: wrote ${outPath}\n`);
}

async function main(): Promise<void> {
  const results = await Promise.allSettled(SPECS.map(generate));
  const failures = results
    .map((r, i) => ({ r, spec: SPECS[i] }))
    .filter((x): x is { r: PromiseRejectedResult; spec: Spec } => x.r.status === 'rejected');
  if (failures.length > 0) {
    for (const { spec, r } of failures) {
      process.stderr.write(`[gen-types] FAILED ${spec.name}: ${String(r.reason)}\n`);
    }
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`[gen-types] fatal: ${String(error)}\n`);
  process.exit(1);
});

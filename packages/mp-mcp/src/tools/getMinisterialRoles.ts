import { z } from 'zod';
import { type RawGovernmentPost, type RawPostHolder, getPosts } from '../clients/members.js';
import type { Citation, ToolResponse, ToolResponseMeta } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetMinisterialRolesInputSchema = z.object({
  branch: z
    .enum(['government', 'opposition'])
    .default('government')
    .describe(
      'Which front bench to list. "government" = ministers; "opposition" = shadow posts. Default government.',
    ),
  filter: z
    .string()
    .optional()
    .describe(
      'Case-insensitive substring matched against the post title or department (e.g. "health", "Treasury", "Chancellor"). Strongly recommended — the full list is long.',
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(25)
    .describe(
      'Maximum posts to return (1–50). Default 25. Use filter to narrow rather than raising.',
    ),
  response_format: ResponseFormatSchema,
});

export type GetMinisterialRolesInput = z.infer<typeof GetMinisterialRolesInputSchema>;

export type MinisterialRole = {
  post: string;
  holder: string | null;
  department: string | null;
  member_id?: number | null;
  start_date?: string;
  is_paid?: boolean;
};

export type GetMinisterialRolesData = {
  branch: 'government' | 'opposition';
  filter: string | null;
  roles: MinisterialRole[];
};

export async function getMinisterialRoles(
  input: GetMinisterialRolesInput,
): Promise<ToolResponse<GetMinisterialRolesData>> {
  const detailed = input.response_format === 'detailed';
  const posts = await getPosts(input.branch);

  const needle = input.filter?.toLowerCase().trim();
  const matched = needle ? posts.filter((p) => postMatches(p, needle)) : posts;

  const roles = matched.slice(0, input.limit).map((p) => toRole(p, detailed));

  const meta: ToolResponseMeta = { upstream_calls: 1 };
  if (matched.length > input.limit) {
    meta.truncated = true;
    meta.truncation_hint = `Returned ${input.limit} of ${matched.length} ${input.branch} posts. Narrow with a more specific filter.`;
  }

  const sources: Citation[] = [Citations.ministerialRoles(input.branch)];
  return buildResponse(
    { branch: input.branch, filter: input.filter ?? null, roles },
    sources,
    meta,
  );
}

function postMatches(post: RawGovernmentPost, needle: string): boolean {
  if ((post.name ?? '').toLowerCase().includes(needle)) return true;
  return (post.governmentDepartments ?? []).some((d) =>
    (d.name ?? '').toLowerCase().includes(needle),
  );
}

// The current holder is the open-ended posting (no end date); fall back to the
// most recently started one when none is open.
function currentHolder(post: RawGovernmentPost): RawPostHolder | null {
  const holders = post.postHolders ?? [];
  const open = holders.find((h) => h.endDate === null);
  if (open) return open;
  return [...holders].sort((a, b) => b.startDate.localeCompare(a.startDate))[0] ?? null;
}

function toRole(post: RawGovernmentPost, detailed: boolean): MinisterialRole {
  const holder = currentHolder(post);
  const member = holder?.member?.value ?? null;
  const role: MinisterialRole = {
    post: post.name ?? '',
    holder: member?.nameDisplayAs ?? null,
    department: post.governmentDepartments?.[0]?.name ?? null,
  };
  if (detailed) {
    role.member_id = member?.id ?? null;
    role.start_date = holder?.startDate;
    role.is_paid = holder?.isPaid;
  }
  return role;
}

export const getMinisterialRolesToolDefinition = {
  name: 'parliament_get_ministerial_roles',
  description: [
    'List government ministers or opposition shadow post-holders, with the current holder and department for each post.',
    '',
    'Good for: "who is the Health Secretary?", "list the shadow Treasury team", "which minister covers housing?". Always pass a filter when you can — the full list is long.',
    '',
    "Wrong for: a single member's profile (use parliament_find_member); the party balance of a house (use parliament_get_state_of_parties); committee membership (use parliament_get_committee).",
    '',
    'Inputs: branch (government|opposition, default government), filter (substring on post title or department — strongly recommended), limit (1–50, default 25), response_format (concise|detailed; detailed adds the holder member_id, start date, and whether the post is paid).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when the list is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetMinisterialRolesInputSchema,
  handler: getMinisterialRoles,
} as const;

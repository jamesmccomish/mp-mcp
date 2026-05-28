import { z } from 'zod';

export const DraftConstituentLetterPromptDefinition = {
  name: 'draft-constituent-letter',
  description:
    "Draft a constituent letter to an MP, grounded in the MP's actual voting record and Hansard contributions on the issue.",
  argsSchema: {
    member_name_or_postcode: z
      .string()
      .describe('The MP being written to (name or postcode of the constituent).'),
    issue: z
      .string()
      .describe('What the constituent wants to write about (e.g. "the renters rights bill").'),
  },
  build: (args: { member_name_or_postcode: string; issue: string }): string => `\
Draft a constituent letter from a UK voter to their MP, grounded in the MP's actual record.

Target MP: ${args.member_name_or_postcode}
Issue: ${args.issue}

Steps:
1. Resolve the MP: call \`parliament_find_member\` with \`query="${args.member_name_or_postcode}"\` and take the first match.
2. Pull the MP's record on this issue (run in parallel):
   - \`parliament_member_voting_history\` with the \`member_id\`, \`topic="${args.issue}"\`, \`limit=10\`.
   - \`parliament_search_hansard\` with \`query="${args.issue}"\`, \`member_id=<from step 1>\`, \`limit=10\`.
3. Draft a letter of ~350 words:
   - Constituent-tone opening (no boilerplate; the constituent introduces themselves and their stake in the issue).
   - One paragraph acknowledging what the MP has done — quote a specific vote (with date) or a Hansard contribution (with excerpt). This is the grounding step; the letter is hollow without it.
   - One paragraph explaining the constituent's position and what specifically they want the MP to do next.
   - Polite sign-off requesting a reply.
4. After the letter body, output a "**Sources used**" section listing every parliament.uk URL from the tools' \`sources\` arrays.

Citations: every factual claim about the MP's record in the letter body must reference a real vote or Hansard contribution. Do not invent positions. If \`member_voting_history\` returns QUERY_TOO_BROAD or finds nothing on the topic, say so explicitly in the letter ("I haven't been able to find a vote from you on this issue") rather than fabricating one.
`,
} as const;

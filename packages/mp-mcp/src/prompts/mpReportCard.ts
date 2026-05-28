import { z } from 'zod';

export const MpReportCardPromptDefinition = {
  name: 'mp-report-card',
  description:
    'One-page report card for a UK MP, given a postcode or a name. Orchestrates find_member → member_overview and renders an artifact-ready markdown summary.',
  argsSchema: {
    postcode_or_name: z
      .string()
      .describe('UK postcode (e.g. "SW1A 0AA") or member name (e.g. "Diane Abbott").'),
  },
  build: (args: { postcode_or_name: string }): string => `\
Build a one-page MP report card for: **${args.postcode_or_name}**

Steps:
1. Call \`parliament_find_member\` with \`query="${args.postcode_or_name}"\` (the tool auto-detects postcode vs. name). Take the first match.
2. Call \`parliament_member_overview\` with the matched \`member_id\`, \`response_format="concise"\`, \`recent_votes_limit=5\`.
3. Render the result as markdown with these sections, in order:
   - **Header**: name, party, constituency, status (sitting / former), one-line synopsis.
   - **Recent voting**: a short bulleted list (date — title — aye/no/teller). Note if any are against the party whip if you can tell.
   - **What they work on**: policy focus topics, committee memberships (highlight any chair role), top 3 recent Hansard contributions.
   - **Declared interests**: top 3 most recent register entries grouped by category.
   - **Sources**: bulleted list of all URLs from both tools' \`sources\` arrays.

Citations: every factual claim about the MP must cite the relevant URL inline as \`[Source](url)\`. Use the URLs returned in each tool's \`sources\` field. Do not fabricate URLs.

If \`parliament_find_member\` returns NO_MEMBER_FOUND, surface its \`suggestion\` field verbatim and stop.
`,
} as const;

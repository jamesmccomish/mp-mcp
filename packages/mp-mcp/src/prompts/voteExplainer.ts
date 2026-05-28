import { z } from 'zod';

export const VoteExplainerPromptDefinition = {
  name: 'vote-explainer',
  description:
    'Explain a Commons division: the motion, the result, party breakdown, and the surrounding debate.',
  argsSchema: {
    division_id_or_hansard_url: z
      .string()
      .describe(
        'Either a numeric Commons DivisionId (from parliament_member_voting_history) or a hansard.parliament.uk URL.',
      ),
  },
  build: (args: { division_id_or_hansard_url: string }): string => `\
Explain Commons division: **${args.division_id_or_hansard_url}**

Steps:
1. Resolve the division id:
   - If the input is a number, use it directly.
   - If it's a hansard.parliament.uk URL, look for an associated division by passing the linked debate to \`parliament_get_debate\` and extracting any division references.
2. Call \`parliament_get_division\` with the resolved id and \`response_format="concise"\`.
3. Optionally call \`parliament_get_debate\` with the surrounding debate (use the date + house to drill in via \`parliament_search_hansard\` if no \`debate_ext_id\` is to hand) to add context.

Then render markdown with:
- **What was voted on** (one paragraph: title, date, motion in plain English).
- **Result**: ayes vs. noes, whether it passed.
- **Party breakdown**: bullet list of each party's aye/no count. Highlight any cross-party rebellions if the data shows them clearly.
- **Why it mattered** (one paragraph from the surrounding debate if available).
- **Sources**: list every URL used.

Citations: cite the division URL and the debate URL inline next to each factual claim. Do not characterise MPs' motives — describe how they voted and what was said in the debate, nothing more.
`,
} as const;

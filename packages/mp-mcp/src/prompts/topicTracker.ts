import { z } from 'zod';

export const TopicTrackerPromptDefinition = {
  name: 'topic-tracker',
  description:
    'Narrative briefing on what Parliament is doing about a given topic — bills, recent debates, votes, written questions, and active petitions.',
  argsSchema: {
    topic: z
      .string()
      .describe(
        'Short policy topic phrase (e.g. "renters reform", "NHS waiting lists", "AI"). Best as a noun phrase the model expects to appear in titles.',
      ),
    lookback_days: z
      .string()
      .optional()
      .describe('Optional days of history (default 90). Pass as a string number (e.g. "180").'),
  },
  build: (args: { topic: string; lookback_days?: string }): string => {
    const days = args.lookback_days ? Number.parseInt(args.lookback_days, 10) : 90;
    return `\
Brief the user on what Parliament is doing about: **${args.topic}**

Step 1: call \`parliament_topic_tracker\` with \`topic="${args.topic}"\` and \`lookback_days=${days}\`.

Then render a markdown briefing with these sections, omitting any that are empty:
- **Bills in progress** (id — title — current stage — last update).
- **Recent debates** (date — title — house, with hansard link).
- **Recent votes** (date — title — ayes/noes).
- **Written questions** (date — UIN — short excerpt of the question, answered yes/no).
- **Active petitions** (signature count — title — state).

Open with a 2–3 sentence narrative summary that names the trend (e.g. "the bill has cleared the Lords and is awaiting Royal Assent", or "no current government action; activity is dominated by written questions and petitions").

Citations: every factual claim must cite the URL inline. Use the URLs returned in \`sources\`. Do not fabricate URLs.

If a section is empty (e.g. no bills), explicitly say so rather than padding the response with unrelated material.
`;
  },
} as const;

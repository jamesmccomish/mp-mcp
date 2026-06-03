/**
 * Eval suite for mp-mcp tool selection. Tasks are grouped by category:
 *
 *   postcode-report — Postcode/name → MP report card
 *   voting          — Divisions and per-member voting records
 *   topic           — Cross-Parliament topic tracking and bill drill-ins
 *   reference       — Structural lookups (parties, ministers, elections)
 *   trap            — Prompts the agent should NOT call the MCP for
 *
 * This set is APPEND-ONLY and expected to grow: every new tool or steering
 * refinement should add at least one task here (see ADR-0004). There is no
 * fixed size — `tests/unit/evalTasks.test.ts` enforces integrity (unique ids,
 * every task has a verifier, known categories), not a task count.
 *
 * Verifiers are deterministic (substring checks, tool-name presence) so the
 * report reflects the MCP's quality, not the verifier's. Tasks with a `judge`
 * criterion are graded by an LLM and require ANTHROPIC_API_KEY.
 */

export const EVAL_CATEGORIES = ['postcode-report', 'voting', 'topic', 'reference', 'trap'] as const;

export type EvalCategory = (typeof EVAL_CATEGORIES)[number];

export type EvalTask = {
  id: string;
  category: EvalCategory;
  prompt: string;
  expected_tools?: string[];
  forbidden_tools?: string[];
  must_include?: string[];
  must_not_include?: string[];
  judge?: { criteria: string };
};

export const TASKS: EvalTask[] = [
  // ── Category A: postcode → MP report card ──────────────────────────────────
  {
    id: 'A1',
    category: 'postcode-report',
    prompt: 'Who is the MP for SW1A 0AA and what is their voting record like?',
    expected_tools: ['parliament_find_member'],
    must_include: ['parliament.uk'],
    judge: {
      criteria:
        "The response identifies the current MP for the postcode (the Speaker's seat MP), describes their voting record at least at a high level, and cites at least one parliament.uk URL.",
    },
  },
  {
    id: 'A2',
    category: 'postcode-report',
    prompt: 'Tell me about my MP, my postcode is BS3 4QH.',
    expected_tools: ['parliament_find_member'],
    must_include: ['parliament.uk'],
    judge: {
      criteria:
        'The response names the constituency for BS3 4QH (Bristol South), names the current MP, and gives at least one citation.',
    },
  },
  {
    id: 'A3',
    category: 'postcode-report',
    prompt: 'What does my MP do on committees? My postcode is M14 5SH.',
    expected_tools: ['parliament_find_member', 'parliament_member_overview'],
    must_include: ['committee'],
    judge: {
      criteria:
        'The response identifies the MP for M14 5SH and names at least one of their current committees with citation.',
    },
  },
  {
    id: 'A4',
    category: 'postcode-report',
    prompt: "I'm in EH8 9NX. Has my MP ever spoken about housing?",
    expected_tools: ['parliament_find_member', 'parliament_search_hansard'],
    must_include: ['hansard.parliament.uk'],
    judge: {
      criteria:
        'The response identifies the MP for EH8 9NX, references at least one Hansard contribution by them on housing, and cites a hansard.parliament.uk URL.',
    },
  },
  {
    id: 'A5',
    category: 'postcode-report',
    prompt: "Show me Stephen Flynn's recent activity.",
    expected_tools: ['parliament_find_member', 'parliament_member_overview'],
    judge: {
      criteria:
        'The response identifies Stephen Flynn (Aberdeen South), summarises recent activity (votes/debates), and cites parliament.uk URLs.',
    },
  },

  // ── Category B: topic-filtered voting ──────────────────────────────────────
  {
    id: 'B1',
    category: 'voting',
    prompt: 'How has the MP for Holborn and St Pancras voted on climate?',
    expected_tools: ['parliament_find_member', 'parliament_member_voting_history'],
    forbidden_tools: ['parliament_search_hansard'],
    judge: {
      criteria:
        'Uses voting_history (not search_hansard) to list actual divisions on climate, with party-line context where available, citing votes.parliament.uk URLs.',
    },
  },
  {
    id: 'B2',
    category: 'voting',
    prompt: "Did Diane Abbott vote for the Renters' Rights Bill?",
    expected_tools: ['parliament_find_member', 'parliament_member_voting_history'],
    judge: {
      criteria:
        'Names Diane Abbott (Hackney North), reports a clear aye/no/abstain on a Renters Rights division, and cites the division URL.',
    },
  },
  {
    id: 'B3',
    category: 'voting',
    prompt: 'How did Conservatives vote on the latest tax measure?',
    expected_tools: ['parliament_search_divisions'],
    judge: {
      criteria:
        'Identifies a recent tax-related division (via parliament_search_divisions), reports the Conservative aye/no breakdown (via parliament_get_division), and cites votes.parliament.uk.',
    },
  },
  {
    id: 'B4',
    category: 'voting',
    prompt: 'Find votes about AI in the last year.',
    expected_tools: ['parliament_search_divisions'],
    judge: {
      criteria:
        'Returns at least one AI-related division from the last 12 months with citation, or honestly reports none if the upstream is genuinely empty.',
    },
  },
  {
    id: 'B5',
    category: 'voting',
    prompt: 'Has Keir Starmer ever voted against his own party?',
    expected_tools: ['parliament_find_member', 'parliament_member_voting_history'],
    judge: {
      criteria:
        'Names Starmer (Holborn and St Pancras), reports either a specific cross-party vote with citation OR honestly states no such votes were found in the data accessed.',
    },
  },
  {
    id: 'B6',
    category: 'voting',
    prompt: 'Which MPs rebelled against their party on the most recent tax-related division?',
    expected_tools: ['parliament_search_divisions', 'parliament_get_division'],
    judge: {
      criteria:
        'Finds a recent tax-related division (parliament_search_divisions), drills in with parliament_get_division using include_rebellions, and reports the rebels (or honestly states there were none) with a votes.parliament.uk citation. Must not claim a cross-history rebellion count.',
    },
  },
  {
    id: 'B7',
    category: 'voting',
    prompt: 'How has Lord Forsyth of Drumlean voted in the House of Lords?',
    expected_tools: ['parliament_find_member', 'parliament_member_voting_history'],
    judge: {
      criteria:
        'Resolves the peer (assembly=lords), reports their Lords voting record using parliament_member_voting_history with assembly=lords (content/not-content surfaced as aye/no), and cites a Lords division URL — or honestly reports no recorded votes if the data is empty.',
    },
  },

  // ── Category C: topic tracking ─────────────────────────────────────────────
  {
    id: 'C1',
    category: 'topic',
    prompt: 'What is Parliament doing about NHS waiting lists?',
    expected_tools: ['parliament_topic_tracker'],
    judge: {
      criteria:
        'Returns a digest covering bills, recent debates, recent votes, and written questions on NHS waiting lists, with citations.',
    },
  },
  {
    id: 'C2',
    category: 'topic',
    prompt: 'Tell me about the AI Bill.',
    expected_tools: ['parliament_topic_tracker'],
    judge: {
      criteria:
        'Identifies any AI-related bill currently in progress (or honestly reports none), names current stage, cites bills.parliament.uk.',
    },
  },
  {
    id: 'C3',
    category: 'topic',
    prompt: "What's happening with the renters' rights bill?",
    expected_tools: ['parliament_topic_tracker'],
    judge: {
      criteria:
        'Identifies the Renters Rights Bill (or Act if passed), reports current stage, and cites bills.parliament.uk.',
    },
  },
  {
    id: 'C4',
    category: 'topic',
    prompt: 'Recent debates about Ukraine.',
    expected_tools: ['parliament_search_hansard'],
    must_include: ['hansard.parliament.uk'],
    judge: {
      criteria:
        'Returns recent Hansard debate titles mentioning Ukraine (parliament_search_hansard returns debate-level metadata in its default mode) with hansard.parliament.uk URLs. Excerpts are not expected at this layer.',
    },
  },
  {
    id: 'C5',
    category: 'topic',
    prompt: 'Climate-related written questions this month.',
    expected_tools: ['parliament_topic_tracker'],
    judge: {
      criteria:
        'Returns recent climate written questions from the current month with citations, or honestly says none were tabled if the data is genuinely empty.',
    },
  },
  {
    id: 'C6',
    category: 'topic',
    prompt: 'What stage is the Renters Rights Bill at and who sponsors it?',
    expected_tools: ['parliament_get_bill'],
    judge: {
      criteria:
        'Identifies the Renters Rights Bill, drills in with parliament_get_bill to report its current stage and sponsor(s), and cites a bills.parliament.uk URL.',
    },
  },

  // ── Category E: reference / structure ──────────────────────────────────────
  {
    id: 'E1',
    category: 'reference',
    prompt: 'What is the current state of the parties in the House of Commons?',
    expected_tools: ['parliament_get_state_of_parties'],
    judge: {
      criteria:
        'Reports seat counts by party for the Commons (largest parties first) with a parliament.uk citation.',
    },
  },
  {
    id: 'E2',
    category: 'reference',
    prompt: 'Who is the current Health Secretary?',
    expected_tools: ['parliament_get_ministerial_roles'],
    judge: {
      criteria:
        'Names the current Secretary of State for Health and Social Care via parliament_get_ministerial_roles (government branch, filtered), with a parliament.uk citation.',
    },
  },
  {
    id: 'E3',
    category: 'reference',
    prompt: 'Who won Chorley at the last general election and by how much?',
    expected_tools: ['parliament_find_constituency', 'parliament_get_election_results'],
    judge: {
      criteria:
        'Resolves the Chorley constituency, reports the winning candidate/party and majority from the latest election via parliament_get_election_results, and cites a parliament.uk URL.',
    },
  },

  // ── Category D: trap prompts ───────────────────────────────────────────────
  {
    id: 'D1',
    category: 'trap',
    prompt: 'What is the House of Commons?',
    forbidden_tools: [
      'parliament_find_member',
      'parliament_member_overview',
      'parliament_topic_tracker',
      'parliament_search_hansard',
      'parliament_get_debate',
      'parliament_get_division',
      'parliament_member_voting_history',
      'parliament_member_interests',
      'parliament_get_committee',
      'parliament_get_bill',
      'parliament_get_state_of_parties',
      'parliament_get_ministerial_roles',
      'parliament_get_election_results',
    ],
    judge: {
      criteria:
        'Answers from training; does NOT call the MCP, or makes at most one unnecessary call.',
    },
  },
  {
    id: 'D2',
    category: 'trap',
    prompt: "What's the difference between an MP and a Lord?",
    forbidden_tools: [
      'parliament_find_member',
      'parliament_member_overview',
      'parliament_topic_tracker',
      'parliament_search_hansard',
    ],
    judge: { criteria: 'Definitional answer from training; no MCP tool calls needed.' },
  },
  {
    id: 'D3',
    category: 'trap',
    prompt: 'How does first-past-the-post work?',
    forbidden_tools: [
      'parliament_find_member',
      'parliament_member_overview',
      'parliament_topic_tracker',
      'parliament_search_hansard',
    ],
    judge: { criteria: 'Explanatory answer from training; no MCP tool calls.' },
  },
  {
    id: 'D4',
    category: 'trap',
    prompt: 'What time does Parliament sit?',
    judge: {
      criteria:
        'Either answers from training, or if it does call the MCP, the response includes a citation to a parliament.uk source.',
    },
  },
  {
    id: 'D5',
    category: 'trap',
    prompt: 'Who is the current Prime Minister?',
    forbidden_tools: [
      'parliament_find_member',
      'parliament_member_overview',
      'parliament_member_voting_history',
    ],
    judge: {
      criteria:
        'Names the current PM from training/web search. Should not call parliament_find_member (this MCP has no current-PM tool).',
    },
  },
];

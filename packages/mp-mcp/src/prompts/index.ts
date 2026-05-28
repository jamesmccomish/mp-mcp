import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DraftConstituentLetterPromptDefinition } from './draftConstituentLetter.js';
import { MpReportCardPromptDefinition } from './mpReportCard.js';
import { TopicTrackerPromptDefinition } from './topicTracker.js';
import { VoteExplainerPromptDefinition } from './voteExplainer.js';

export function registerPrompts(server: McpServer): void {
  server.prompt(
    MpReportCardPromptDefinition.name,
    MpReportCardPromptDefinition.description,
    MpReportCardPromptDefinition.argsSchema,
    async (args) => ({
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: MpReportCardPromptDefinition.build(args) },
        },
      ],
    }),
  );

  server.prompt(
    TopicTrackerPromptDefinition.name,
    TopicTrackerPromptDefinition.description,
    TopicTrackerPromptDefinition.argsSchema,
    async (args) => ({
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: TopicTrackerPromptDefinition.build(args) },
        },
      ],
    }),
  );

  server.prompt(
    DraftConstituentLetterPromptDefinition.name,
    DraftConstituentLetterPromptDefinition.description,
    DraftConstituentLetterPromptDefinition.argsSchema,
    async (args) => ({
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: DraftConstituentLetterPromptDefinition.build(args) },
        },
      ],
    }),
  );

  server.prompt(
    VoteExplainerPromptDefinition.name,
    VoteExplainerPromptDefinition.description,
    VoteExplainerPromptDefinition.argsSchema,
    async (args) => ({
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: VoteExplainerPromptDefinition.build(args) },
        },
      ],
    }),
  );
}

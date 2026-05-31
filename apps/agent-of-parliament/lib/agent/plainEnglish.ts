import Anthropic from '@anthropic-ai/sdk';
import { MODELS } from './models';

// Hansard prose is dense and procedural. This is a cheap Haiku rewrite with NO
// mcp_servers and NO tools — the model is handed the excerpt text and nothing else,
// so it cannot wander off to fetch data; it only restates what it was given.
const PLAIN_ENGLISH_SYSTEM = [
  'You rewrite excerpts of UK parliamentary debate into plain, everyday English.',
  'Keep it faithful to what was said — do not add facts, opinions, or anything not present in the text.',
  'Drop procedural padding and honorifics ("my hon. Friend", "the House"). Use short sentences.',
  'Return only the plain-English version, no preamble.',
].join(' ');

const MAX_TOKENS = 600;

// Rewrite a debate excerpt into plain English. Throws on API error so the caller
// can show an inline failure rather than a silently-empty toggle.
export async function toPlainEnglish(
  excerpt: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<string> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  const message = await client.messages.create(
    {
      model: MODELS.cheap,
      max_tokens: MAX_TOKENS,
      system: PLAIN_ENGLISH_SYSTEM,
      messages: [{ role: 'user', content: excerpt }],
    },
    { signal },
  );

  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim();
}

export const MODELS = {
  default: 'claude-sonnet-4-6',
  cheap: 'claude-haiku-4-5-20251001',
  synthesis: 'claude-opus-4-7',
} as const;

export type ModelTier = keyof typeof MODELS;

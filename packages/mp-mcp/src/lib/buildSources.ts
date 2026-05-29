import type { Citation } from '../domain/citation.js';

// One place to change the "top N sources" cap so tools don't each invent their own.
const DEFAULT_SOURCE_CAP = 5;

export function collectSources<T>(
  items: readonly T[],
  toCitation: (item: T) => Citation,
  max: number = DEFAULT_SOURCE_CAP,
): Citation[] {
  return items.slice(0, max).map(toCitation);
}

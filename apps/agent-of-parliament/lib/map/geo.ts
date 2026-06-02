import {
  CONSTITUENCY_SHAPES,
  type ConstituencyShape,
  MAP_VIEWBOX,
} from './constituencies.generated';

export { type ConstituencyShape, CONSTITUENCY_SHAPES, MAP_VIEWBOX };

// The join key between an MP's constituency (from mp-mcp) and a boundary shape.
// mp-mcp exposes constituency names, not ONS GSS codes, so we match by name —
// flattened to absorb the punctuation/casing/accent drift between the two sources
// ("Argyll, Bute and South Lochaber", "Ynys Môn", "St Helens" all survive).
export function normalizeConstituency(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // strip combining diacritics
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const SHAPE_BY_NORM: Map<string, ConstituencyShape> = new Map(
  CONSTITUENCY_SHAPES.map((s) => [normalizeConstituency(s.name), s]),
);

export function lookupConstituency(name: string): ConstituencyShape | undefined {
  return SHAPE_BY_NORM.get(normalizeConstituency(name));
}

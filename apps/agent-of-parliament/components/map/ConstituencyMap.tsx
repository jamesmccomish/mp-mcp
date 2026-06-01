import {
  CONSTITUENCY_SHAPES,
  MAP_VIEWBOX,
  lookupConstituency,
  normalizeConstituency,
} from '@/lib/map/geo';

// A constituency to colour on the map. Generic on purpose: today the page feeds it
// the MPs in view (filled by party); the same shape later drives a vote-distribution
// choropleth without touching this component.
export interface ConstituencyHighlight {
  name: string;
  colour: string;
  /** Secondary line in the legend, e.g. the party or vote. */
  sublabel?: string;
}

const BASE_FILL = '#dfe4e8';
const BASE_STROKE = '#ffffff';

export function ConstituencyMap({ highlights }: { highlights: ConstituencyHighlight[] }) {
  // Resolve once: fill colour by normalized name (for the SVG) and matched/unmatched
  // split (for the legend). Unmatched names are surfaced, not silently dropped, so a
  // join gap is visible rather than mysterious.
  const fillByNorm = new Map<string, string>();
  const matched: ConstituencyHighlight[] = [];
  const unmatched: ConstituencyHighlight[] = [];
  const markers: { cx: number; cy: number; colour: string }[] = [];
  for (const h of highlights) {
    const shape = lookupConstituency(h.name);
    if (shape) {
      fillByNorm.set(normalizeConstituency(h.name), h.colour);
      matched.push(h);
      markers.push({ cx: shape.cx, cy: shape.cy, colour: h.colour });
    } else {
      unmatched.push(h);
    }
  }

  // Highlighted shapes paint last so their fill and stroke sit above neighbours.
  const ordered = [...CONSTITUENCY_SHAPES].sort((a, b) => {
    const an = fillByNorm.has(normalizeConstituency(a.name)) ? 1 : 0;
    const bn = fillByNorm.has(normalizeConstituency(b.name)) ? 1 : 0;
    return an - bn;
  });

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%', minHeight: 0 }}>
      <svg
        viewBox={MAP_VIEWBOX}
        role="img"
        aria-label="Map of UK parliamentary constituencies"
        style={{ height: '100%', width: 'auto', flexShrink: 0 }}
      >
        <title>UK parliamentary constituencies</title>
        {ordered.map((s) => {
          const fill = fillByNorm.get(normalizeConstituency(s.name));
          return (
            <path
              key={s.cd}
              d={s.d}
              fill={fill ?? BASE_FILL}
              stroke={fill ? '#26231a' : BASE_STROKE}
              strokeWidth={fill ? 2 : 0.5}
            />
          );
        })}
        {/* Marker dots sit above the fills so tiny urban seats stay visible. */}
        {markers.map((m) => (
          <circle
            key={`${m.cx}-${m.cy}`}
            cx={m.cx}
            cy={m.cy}
            r={90}
            fill={m.colour}
            stroke="#ffffff"
            strokeWidth={28}
          />
        ))}
      </svg>

      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', fontSize: 13 }}>
        {matched.length === 0 && unmatched.length === 0 ? (
          <p style={{ color: '#9a9484', margin: 0 }}>
            Constituencies you ask about light up here as the agent finds them.
          </p>
        ) : (
          <>
            {matched.map((h) => (
              <div
                key={h.name}
                style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0' }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: h.colour,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#26231a' }}>
                  {h.name}
                  {h.sublabel && <span style={{ color: '#9a9484' }}> · {h.sublabel}</span>}
                </span>
              </div>
            ))}
            {unmatched.map((h) => (
              <div key={h.name} style={{ color: '#9a9484', margin: '4px 0' }}>
                {h.name} <span style={{ fontStyle: 'italic' }}>· not on map</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

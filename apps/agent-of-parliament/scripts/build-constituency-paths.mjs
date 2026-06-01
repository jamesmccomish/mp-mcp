// Regenerates lib/map/constituencies.generated.ts from ONS boundary data.
//
// Source: ONS Open Geography Portal — "Westminster Parliamentary Constituencies
// (July 2024) Boundaries UK BUC" (ultra-generalised, clipped to coastline), the
// post-2024-general-election set that matches current MPs.
//   https://geoportal.statistics.gov.uk/datasets/ons::westminster-parliamentary-constituencies-july-2024-boundaries-uk-buc-2/about
// Boundary data is Crown copyright / OS, released under the Open Government Licence v3.0.
//
// Run on demand to refresh boundaries: `node scripts/build-constituency-paths.mjs`.
// The generated asset is committed so normal builds need no network.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SOURCE_URL =
  'https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/Westminster_Parliamentary_Constituencies_July_2024_Boundaries_UK_BUC/FeatureServer/0/query?where=1%3D1&outFields=PCON24CD,PCON24NM&outSR=4326&f=geojson';

const VIEW_WIDTH = 2000; // integer SVG coords against this width; height derived from aspect.

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../lib/map/constituencies.generated.ts');

// Mercator is conformal (shape-accurate); fine at UK scale. Both axes in radians
// so the aspect ratio is correct (x in degrees + y in radians would squash it flat).
const mercX = (lon) => (lon * Math.PI) / 180;
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

function ringsOf(geometry) {
  if (geometry.type === 'Polygon') return geometry.coordinates;
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
  return [];
}

async function main() {
  console.error('Fetching ONS BUC boundaries…');
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`ONS fetch failed: ${res.status} ${res.statusText}`);
  const fc = await res.json();
  const features = fc.features ?? [];
  console.error(`Got ${features.length} features.`);

  // Pass 1: projected bounds across every point.
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const f of features) {
    for (const ring of ringsOf(f.geometry)) {
      for (const [lon, lat] of ring) {
        const x = mercX(lon);
        const y = mercY(lat);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const scale = VIEW_WIDTH / (maxX - minX);
  const viewHeight = Math.ceil((maxY - minY) * scale);
  const projX = (lon) => Math.round((mercX(lon) - minX) * scale);
  const projY = (lat) => Math.round((maxY - mercY(lat)) * scale); // flip: north up.

  // Area-weighted centroid of a projected ring (shoelace). Used to place the marker
  // dot for a highlighted seat; falls back to the vertex average for degenerate rings.
  function centroid(points) {
    let a = 0;
    let cx = 0;
    let cy = 0;
    for (let i = 0; i < points.length; i++) {
      const [x0, y0] = points[i];
      const [x1, y1] = points[(i + 1) % points.length];
      const cross = x0 * y1 - x1 * y0;
      a += cross;
      cx += (x0 + x1) * cross;
      cy += (y0 + y1) * cross;
    }
    if (Math.abs(a) < 1e-6) {
      const avg = points.reduce(([sx, sy], [x, y]) => [sx + x, sy + y], [0, 0]);
      return [Math.round(avg[0] / points.length), Math.round(avg[1] / points.length)];
    }
    return [Math.round(cx / (3 * a)), Math.round(cy / (3 * a))];
  }

  // Pass 2: build one SVG path per feature (extra coord pairs after M are implicit
  // lineto) and a centroid from the largest ring.
  const records = features
    .map((f) => {
      const name = f.properties.PCON24NM;
      const cd = f.properties.PCON24CD;
      let biggest = null;
      let biggestArea = -1;
      const d = ringsOf(f.geometry)
        .map((ring) => {
          let prevX = null;
          let prevY = null;
          const pts = [];
          const projected = [];
          for (const [lon, lat] of ring) {
            const x = projX(lon);
            const y = projY(lat);
            projected.push([x, y]);
            if (x === prevX && y === prevY) continue; // drop points that collapse after rounding.
            pts.push(`${x} ${y}`);
            prevX = x;
            prevY = y;
          }
          if (pts.length < 3) return '';
          let area = 0;
          for (let i = 0; i < projected.length; i++) {
            const [x0, y0] = projected[i];
            const [x1, y1] = projected[(i + 1) % projected.length];
            area += x0 * y1 - x1 * y0;
          }
          if (Math.abs(area) > biggestArea) {
            biggestArea = Math.abs(area);
            biggest = projected;
          }
          return `M${pts.join('L')}Z`;
        })
        .filter(Boolean)
        .join('');
      const [cx, cy] = biggest ? centroid(biggest) : [0, 0];
      return { cd, name, cx, cy, d };
    })
    .filter((r) => r.d)
    .sort((a, b) => a.name.localeCompare(b.name));

  const body = records.map((r) => `  ${JSON.stringify(r)},`).join('\n');
  const out = `// GENERATED by scripts/build-constituency-paths.mjs — do not edit by hand.
// Source: ONS Open Geography Portal, Westminster Parliamentary Constituencies
// (July 2024) Boundaries UK BUC. Crown copyright / OS, Open Government Licence v3.0.

export interface ConstituencyShape {
  /** ONS GSS code (PCON24CD). Not used for joins — see normalizeConstituency. */
  cd: string;
  /** Official PCON24NM name. */
  name: string;
  /** Centroid (largest ring) in MAP_VIEWBOX space — marker anchor for highlights. */
  cx: number;
  cy: number;
  /** SVG path in the MAP_VIEWBOX coordinate space. */
  d: string;
}

export const MAP_VIEWBOX = '0 0 ${VIEW_WIDTH} ${viewHeight}';

export const CONSTITUENCY_SHAPES: ConstituencyShape[] = [
${body}
];
`;

  writeFileSync(OUT, out);
  const kb = Math.round(Buffer.byteLength(out) / 1024);
  console.error(`Wrote ${records.length} shapes to ${OUT} (${kb} KB), viewBox 0 0 ${VIEW_WIDTH} ${viewHeight}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

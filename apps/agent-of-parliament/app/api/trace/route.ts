import { recordTurn } from '@/lib/telemetry/recordTurn';
import type { TurnRecord } from '@/lib/telemetry/types';

// Langfuse needs the Node runtime (not edge); telemetry is per-request work.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The browser POSTs a captured turn here; we write it to Langfuse with the
// server-side secret key. Failures are swallowed — telemetry never breaks a turn.
export async function POST(req: Request): Promise<Response> {
  try {
    const record = (await req.json()) as TurnRecord;
    await recordTurn(record);
  } catch (err) {
    console.error('telemetry: failed to record turn', err);
  }
  return new Response(null, { status: 204 });
}

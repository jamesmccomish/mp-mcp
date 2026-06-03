// Telemetry types shared between the browser (which captures a turn from the
// connector stream) and the /api/trace route handler (which writes it to
// Langfuse). Types only — no runtime, safe to import from either side.

export interface TurnUsage {
  input: number;
  output: number;
  cache_read: number;
  cache_creation: number;
}

export interface ToolCallRecord {
  name: string;
  // The arguments the model sent.
  input: unknown;
  // The tool result text the model received, capped (see TELEMETRY_OUTPUT_CAP).
  output: string;
  response_bytes: number;
  upstream_calls?: number;
  truncated?: boolean;
  sources_count: number;
  is_error: boolean;
}

export interface TurnRecord {
  traceId: string;
  sessionId: string;
  model: string;
  input: string;
  output: string;
  usage: TurnUsage;
  toolCalls: ToolCallRecord[];
}

// Side-channel the stream transform feeds while it produces UI events, so we can
// capture telemetry without changing the AgentEvent protocol the UI consumes.
export interface TelemetrySink {
  onUsage(usage: Partial<TurnUsage> & { model?: string }): void;
  onTool(tool: ToolCallRecord): void;
}

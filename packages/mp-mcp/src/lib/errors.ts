export type ParliamentErrorCode =
  | 'NO_MEMBER_FOUND'
  | 'NO_CONSTITUENCY_FOUND'
  | 'NO_DIVISION_FOUND'
  | 'NO_DEBATE_FOUND'
  | 'NO_COMMITTEE_FOUND'
  | 'QUERY_TOO_BROAD'
  | 'INVALID_INPUT'
  | 'UPSTREAM_UNAVAILABLE'
  | 'UPSTREAM_TIMEOUT'
  | 'UNEXPECTED_UPSTREAM_SHAPE';

export type ToolErrorPayload = {
  error: {
    code: ParliamentErrorCode;
    message: string;
    suggestion: string;
  };
};

export class ParliamentToolError extends Error {
  readonly code: ParliamentErrorCode;
  readonly suggestion: string;

  constructor(code: ParliamentErrorCode, message: string, suggestion: string) {
    super(message);
    this.name = 'ParliamentToolError';
    this.code = code;
    this.suggestion = suggestion;
  }

  toPayload(): ToolErrorPayload {
    return {
      error: {
        code: this.code,
        message: this.message,
        suggestion: this.suggestion,
      },
    };
  }
}

export function serializeError(error: unknown): ToolErrorPayload {
  if (error instanceof ParliamentToolError) {
    return error.toPayload();
  }
  const message = error instanceof Error ? error.message : String(error);
  return {
    error: {
      code: 'UPSTREAM_UNAVAILABLE',
      message,
      suggestion:
        'The tool encountered an unexpected error. Retry once; if it persists, try a narrower query or a sibling tool.',
    },
  };
}

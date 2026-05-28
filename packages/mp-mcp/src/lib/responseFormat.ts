import { z } from 'zod';
import type {
  Citation,
  ResponseFormat,
  ToolResponse,
  ToolResponseMeta,
} from '../domain/citation.js';

export const ResponseFormatSchema = z
  .enum(['concise', 'detailed'])
  .default('concise')
  .describe(
    'Verbosity of the response. "concise" returns the minimum fields the agent needs to answer the user; "detailed" adds IDs, URLs, and secondary fields useful for chaining further tool calls. Default: concise.',
  );

export type ShapeBuilder<TRaw, TShape> = (raw: TRaw) => TShape;

export type FormatShapes<TRaw, TConcise, TDetailed> = {
  concise: ShapeBuilder<TRaw, TConcise>;
  detailed: ShapeBuilder<TRaw, TDetailed>;
};

export function shape<TRaw, TConcise, TDetailed>(
  raw: TRaw,
  format: ResponseFormat,
  shapes: FormatShapes<TRaw, TConcise, TDetailed>,
): TConcise | TDetailed {
  return format === 'detailed' ? shapes.detailed(raw) : shapes.concise(raw);
}

export function buildResponse<T>(
  data: T,
  sources: Citation[],
  meta?: ToolResponseMeta,
): ToolResponse<T> {
  return meta ? { data, sources, meta } : { data, sources };
}

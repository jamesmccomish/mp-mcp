export type House = 'Commons' | 'Lords';

export type Citation = {
  title: string;
  url: string;
};

export type ResponseFormat = 'concise' | 'detailed';

export type ToolResponseMeta = {
  upstream_calls?: number;
  truncated?: boolean;
  truncation_hint?: string;
};

export type ToolResponse<T> = {
  data: T;
  sources: Citation[];
  meta?: ToolResponseMeta;
};

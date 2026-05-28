export type Interest = {
  category: string;
  entries: Array<{
    interest: string;
    registered_on: string | null;
    published_on: string | null;
  }>;
};

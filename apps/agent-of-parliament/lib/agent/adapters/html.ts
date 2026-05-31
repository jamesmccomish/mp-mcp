// Tool payloads embed HTML — anchor tags in member synopses, <Question> and
// <span class="column-number"> markup in Hansard excerpts. Strip every tag and
// collapse whitespace so cards render plain, injection-safe prose.
export function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

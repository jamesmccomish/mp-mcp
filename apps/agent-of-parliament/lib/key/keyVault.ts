// In-tab storage for the user's Anthropic key. sessionStorage keeps it to the
// tab and clears it when the tab closes; it is only ever sent to
// api.anthropic.com, never to our own origins.
const STORAGE_KEY = 'aop_anthropic_key';

function store(): Storage | null {
  return typeof window === 'undefined' ? null : window.sessionStorage;
}

export function setKey(key: string): void {
  const trimmed = key.trim();
  const s = store();
  if (!s) return;
  if (trimmed) {
    s.setItem(STORAGE_KEY, trimmed);
  } else {
    s.removeItem(STORAGE_KEY);
  }
}

export function getKey(): string | null {
  return store()?.getItem(STORAGE_KEY) ?? null;
}

export function hasKey(): boolean {
  return getKey() !== null;
}

export function clearKey(): void {
  store()?.removeItem(STORAGE_KEY);
}

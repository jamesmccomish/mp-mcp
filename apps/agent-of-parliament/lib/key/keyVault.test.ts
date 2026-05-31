import { beforeEach, describe, expect, it } from 'vitest';
import { clearKey, getKey, hasKey, setKey } from './keyVault';

describe('keyVault', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('reports no key when absent', () => {
    expect(hasKey()).toBe(false);
    expect(getKey()).toBeNull();
  });

  it('stores and reads a key', () => {
    setKey('sk-ant-test123');
    expect(hasKey()).toBe(true);
    expect(getKey()).toBe('sk-ant-test123');
  });

  it('trims surrounding whitespace on store', () => {
    setKey('  sk-ant-padded  ');
    expect(getKey()).toBe('sk-ant-padded');
  });

  it('treats a blank key as no key', () => {
    setKey('   ');
    expect(hasKey()).toBe(false);
    expect(getKey()).toBeNull();
  });

  it('clears a stored key', () => {
    setKey('sk-ant-test123');
    clearKey();
    expect(hasKey()).toBe(false);
    expect(getKey()).toBeNull();
  });
});

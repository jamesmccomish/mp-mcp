import { describe, expect, it } from 'vitest';
import { TASKS } from '../../evals/tasks.js';

describe('eval task set', () => {
  it('contains 20 tasks', () => {
    expect(TASKS).toHaveLength(20);
  });

  it('has exactly 5 tasks per category', () => {
    const counts = new Map<string, number>();
    for (const t of TASKS) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
    expect(counts.get('postcode-report')).toBe(5);
    expect(counts.get('voting')).toBe(5);
    expect(counts.get('topic')).toBe(5);
    expect(counts.get('trap')).toBe(5);
  });

  it('has unique ids', () => {
    const ids = TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every task either has a verifier hook or a judge criterion', () => {
    for (const t of TASKS) {
      const hasHook =
        Boolean(t.expected_tools && t.expected_tools.length > 0) ||
        Boolean(t.forbidden_tools && t.forbidden_tools.length > 0) ||
        Boolean(t.must_include && t.must_include.length > 0) ||
        Boolean(t.must_not_include && t.must_not_include.length > 0);
      expect(hasHook || Boolean(t.judge?.criteria), `task ${t.id} has no verifier`).toBe(true);
    }
  });

  it('trap tasks list at least one forbidden tool or are explicitly trap-judged', () => {
    const traps = TASKS.filter((t) => t.category === 'trap');
    for (const t of traps) {
      const hasForbidden = Boolean(t.forbidden_tools && t.forbidden_tools.length > 0);
      const hasJudge = Boolean(t.judge?.criteria);
      expect(hasForbidden || hasJudge, `trap task ${t.id} missing both checks`).toBe(true);
    }
  });
});

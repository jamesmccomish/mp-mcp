import { describe, expect, it } from 'vitest';
import { EVAL_CATEGORIES, TASKS } from '../../evals/tasks.js';

// The eval set is append-only and expected to grow as tools are added (ADR-0004).
// These checks enforce structural integrity, NOT a fixed size — adding relevant
// tasks should never require loosening a count assertion.

describe('eval task set', () => {
  it('is non-empty', () => {
    expect(TASKS.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses only known categories', () => {
    const known = new Set<string>(EVAL_CATEGORIES);
    for (const t of TASKS) {
      expect(known.has(t.category), `task ${t.id} has unknown category "${t.category}"`).toBe(true);
    }
  });

  it('keeps every declared category populated', () => {
    for (const category of EVAL_CATEGORIES) {
      const count = TASKS.filter((t) => t.category === category).length;
      expect(count, `category "${category}" has no tasks`).toBeGreaterThan(0);
    }
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

import { describe, expect, it } from 'vitest';
import { BENCHMARK_TASK_IDS } from '../../evals/benchmark.js';
import { TASKS } from '../../evals/tasks.js';

// No-API integrity check: the curated benchmark ids must resolve to real tasks.
describe('benchmark task selection', () => {
  it('references only ids that exist in the eval task set', () => {
    const known = new Set(TASKS.map((t) => t.id));
    for (const id of BENCHMARK_TASK_IDS) {
      expect(known.has(id), `benchmark id "${id}" not found in TASKS`).toBe(true);
    }
  });

  it('selects at least two tasks', () => {
    expect(BENCHMARK_TASK_IDS.length).toBeGreaterThanOrEqual(2);
  });
});

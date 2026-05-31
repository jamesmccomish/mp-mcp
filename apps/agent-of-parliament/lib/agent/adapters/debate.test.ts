import { describe, expect, it } from 'vitest';
import { debateFixture } from './__fixtures__/debate';
import { hansardSearchFixture } from './__fixtures__/hansardSearch';
import { adaptDebate } from './debate';

describe('adaptDebate — search-hit shape', () => {
  const { data, sources } = hansardSearchFixture;

  it('discriminates into search mode', () => {
    const vm = adaptDebate(data, sources);
    expect(vm.mode).toBe('search');
  });

  it('maps every hit, trimming titles and stripping excerpt HTML', () => {
    const vm = adaptDebate(data, sources);
    if (vm.mode !== 'search') throw new Error('expected search mode');

    expect(vm.hitCount).toBe(3);
    expect(vm.hits).toHaveLength(3);

    const [first] = vm.hits;
    expect(first?.speaker).toBe('Mr Falconer');
    expect(first?.memberName).toBe('Mr Hamish Falconer');
    expect(first?.debateTitle).toBe('Imprisonment of Craig and Lindsay Foreman in Iran');
    expect(first?.excerpt).not.toMatch(/[<>]/);
    expect(first?.excerpt).toContain('to other Members');
  });

  it('passes sources through', () => {
    const vm = adaptDebate(data, sources);
    expect(vm.sources).toBe(sources);
  });
});

describe('adaptDebate — single-debate shape', () => {
  const { data, sources } = debateFixture;

  it('discriminates into debate mode', () => {
    const vm = adaptDebate(data, sources);
    expect(vm.mode).toBe('debate');
  });

  it('flattens the debate header', () => {
    const vm = adaptDebate(data, sources);
    if (vm.mode !== 'debate') throw new Error('expected debate mode');

    expect(vm.title).toBe('NHS Management');
    expect(vm.house).toBe('Commons');
    expect(vm.location).toBe('Commons Chamber');
    expect(vm.totalItems).toBe(6);
    expect(vm.truncated).toBe(false);
  });

  it('strips contribution markup, including <Question> wrappers and column spans', () => {
    const vm = adaptDebate(data, sources);
    if (vm.mode !== 'debate') throw new Error('expected debate mode');

    expect(vm.contributions).toHaveLength(6);
    expect(vm.contributions[0]?.text).toBe(
      '3. What steps he is taking to improve the effectiveness of NHS management.',
    );
    expect(vm.contributions[2]?.text).not.toMatch(/[<>]/);
    expect(vm.contributions[2]?.text).toContain('last month two national health service trusts');
  });
});

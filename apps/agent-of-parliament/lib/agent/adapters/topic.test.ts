import { describe, expect, it } from 'vitest';
import { topicTrackerFixture } from './__fixtures__/topicTracker';
import { adaptTopic } from './topic';

const { data, sources } = topicTrackerFixture;

describe('adaptTopic', () => {
  it('carries the topic and window through', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.topic).toBe('NHS waiting lists');
    expect(vm.window).toEqual({ from: '2025-12-02', to: '2026-05-31' });
  });

  it('flattens bills, flagging enacted ones', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.bills).toHaveLength(2);
    expect(vm.bills[0]).toEqual({
      id: 3801,
      title: 'NHS (Waiting Times Targets) Bill',
      stage: '2nd reading',
      isAct: false,
    });
    expect(vm.bills[1]?.isAct).toBe(true);
  });

  it('flattens debates with house and date', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.debates).toHaveLength(2);
    expect(vm.debates[0]).toEqual({
      title: 'NHS Waiting Lists',
      house: 'Commons',
      date: '2026-05-19T00:00:00',
    });
    expect(vm.debates[1]?.house).toBe('Lords');
  });

  it('flattens votes to title, date and lobby counts', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.votes).toHaveLength(2);
    expect(vm.votes[0]).toEqual({
      title: 'Opposition Day: NHS Performance',
      date: '2026-03-10T17:42:00',
      ayes: 198,
      noes: 340,
    });
  });

  it('flattens written questions, preserving answered state', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.questions).toHaveLength(2);
    expect(vm.questions[0]?.house).toBe('Commons');
    expect(vm.questions[0]?.dateTabled).toBe('2026-05-20T00:00:00');
    expect(vm.questions[0]?.answered).toBe(true);
    expect(vm.questions[0]?.question).toContain('52 weeks');
    expect(vm.questions[1]?.answered).toBe(false);
  });

  it('flattens petitions, preserving the signature-descending order', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.petitions).toHaveLength(2);
    expect(vm.petitions[0]).toEqual({
      action: 'Increase NHS funding to clear the elective care backlog within two years',
      signatures: 184302,
    });
    expect(vm.petitions[0]?.signatures ?? 0).toBeGreaterThanOrEqual(
      vm.petitions[1]?.signatures ?? 0,
    );
  });

  it('passes sources through', () => {
    const vm = adaptTopic(data, sources);
    expect(vm.sources).toBe(sources);
  });
});

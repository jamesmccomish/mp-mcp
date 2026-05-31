import type { MemberOverviewData } from 'mp-mcp/types';
import { describe, expect, it } from 'vitest';
import { memberOverviewFixture } from './__fixtures__/memberOverview';
import { adaptMp } from './mp';

const { data, sources } = memberOverviewFixture;

describe('adaptMp', () => {
  it('flattens the detailed member into hero fields', () => {
    const vm = adaptMp(data, sources);
    expect(vm.id).toBe(4444);
    expect(vm.name).toBe('Karin Smyth');
    expect(vm.party).toBe('Labour');
    expect(vm.constituency).toBe('Bristol South');
    expect(vm.house).toBe('Commons');
    expect(vm.status).toBe('current');
    expect(vm.thumbnailUrl).toBe('https://members-api.parliament.uk/api/Members/4444/Thumbnail');
  });

  it('strips HTML and collapses whitespace in the synopsis', () => {
    const vm = adaptMp(data, sources);
    expect(vm.synopsis).not.toMatch(/[<>]/);
    expect(vm.synopsis).toContain('Bristol South');
    expect(vm.synopsis).not.toContain('\r');
    expect(vm.synopsis).not.toContain('\n');
    expect(vm.synopsis).toContain('since 7 May 2015. She currently holds');
  });

  it('reshapes recent votes to the view-model shape', () => {
    const vm = adaptMp(data, sources);
    expect(vm.recentVotes).toHaveLength(4);
    expect(vm.recentVotes[0]).toEqual({
      divisionId: 2350,
      title:
        'Draft Immigration and Asylum (Provision of Accommodation to Failed Asylum-Seekers) (Amendment) Regulations 2026',
      date: '2026-04-28T00:00:00',
      vote: 'aye',
      passed: true,
    });
    expect(vm.recentVotes[2]?.vote).toBe('no');
    expect(vm.recentVotes[2]?.passed).toBe(false);
  });

  it('reshapes recent contributions, taking the debate title', () => {
    const vm = adaptMp(data, sources);
    expect(vm.recentContributions[0]).toEqual({
      title: 'Health and Social Care',
      date: '2026-04-28T00:00:00',
      section: 'Written Corrections',
    });
  });

  it('reshapes committees with role and chair flag', () => {
    const vm = adaptMp(data, sources);
    expect(vm.committees[0]).toEqual({
      name: 'Public Accounts Committee',
      role: 'Member',
      isChair: false,
    });
  });

  it('passes contact, interests, and sources through', () => {
    const vm = adaptMp(data, sources);
    expect(vm.contact.email).toBe('karin.smyth.mp@parliament.uk');
    expect(vm.contact.phone).toBeNull();
    expect(vm.interests).toEqual([]);
    expect(vm.sources).toBe(sources);
  });

  it('yields a null thumbnail for the concise (summary) member variant', () => {
    const concise: MemberOverviewData = {
      ...data,
      member: {
        id: 4444,
        name: 'Karin Smyth',
        party: 'Labour',
        constituency: 'Bristol South',
        house: 'Commons',
        status: 'current',
      },
    };
    const vm = adaptMp(concise, sources);
    expect(vm.thumbnailUrl).toBeNull();
  });
});

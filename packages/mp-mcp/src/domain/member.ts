import type { House } from './citation.js';

export type MemberStatus = 'current' | 'former';

export type MemberSummary = {
  id: number;
  name: string;
  party: string;
  constituency: string | null;
  house: House;
  status: MemberStatus;
};

export type MemberDetailed = MemberSummary & {
  full_title: string;
  gender: string | null;
  thumbnail_url: string | null;
  membership_started: string;
  membership_ended: string | null;
};

export type ConstituencySummary = {
  id: number;
  name: string;
  start_date: string;
  end_date: string | null;
  current_member: MemberSummary | null;
};

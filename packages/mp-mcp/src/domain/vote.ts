import type { House } from './citation.js';

export type Vote = 'aye' | 'no' | 'teller' | 'absent';

export type MemberVote = {
  division_id: number;
  division_number: number;
  house: House;
  title: string;
  date: string;
  vote: Vote;
  ayes: number;
  noes: number;
  passed: boolean;
};

export type DivisionRebellion = {
  member_id: number;
  name: string;
  party: string;
  voted: 'aye' | 'no';
  party_majority: 'aye' | 'no';
};

export type DivisionDetail = {
  id: number;
  house: House;
  division_number: number;
  title: string;
  date: string;
  ayes: number;
  noes: number;
  passed: boolean;
  ayes_by_party: Record<string, number>;
  noes_by_party: Record<string, number>;
  ayes_members?: Array<{ id: number; name: string; party: string }>;
  noes_members?: Array<{ id: number; name: string; party: string }>;
  rebellions?: DivisionRebellion[];
};

import type { House } from './citation.js';

export type HansardHit = {
  member_name: string;
  member_id: number;
  attributed_to: string;
  debate_title: string;
  debate_ext_id: string;
  contribution_ext_id: string;
  excerpt: string;
  date: string;
  house: House;
  section: string;
};

export type HansardDebateHit = {
  title: string;
  house: House;
  date: string;
  debate_ext_id: string;
};

export type DebateContribution = {
  attributed_to: string | null;
  member_id: number | null;
  type: string;
  text: string;
};

export type DebateDetail = {
  ext_id: string;
  title: string;
  date: string;
  house: House;
  location: string;
  volume: number;
  previous?: { ext_id: string; title: string } | null;
  next?: { ext_id: string; title: string } | null;
  contributions: DebateContribution[];
};

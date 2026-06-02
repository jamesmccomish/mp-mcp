import type { Citation, House, TopicTrackerData } from '@jamesmccomish/mp-mcp/types';

export interface TopicBill {
  id: number;
  title: string;
  stage: string | null;
  isAct: boolean;
}

export interface TopicDebate {
  title: string;
  house: House;
  date: string;
}

export interface TopicVote {
  title: string;
  date: string;
  ayes: number;
  noes: number;
}

export interface TopicQuestion {
  question: string;
  house: House;
  dateTabled: string;
  answered: boolean;
}

export interface TopicPetition {
  action: string;
  signatures: number;
}

export interface TopicViewModel {
  topic: string;
  window: { from: string; to: string };
  bills: TopicBill[];
  debates: TopicDebate[];
  votes: TopicVote[];
  questions: TopicQuestion[];
  petitions: TopicPetition[];
  sources: Citation[];
}

// parliament_topic_tracker result -> dossier view-model. `data` is the parsed
// envelope payload from a trusted mp-mcp tool, so it is narrowed to its contract.
// Lobby verdicts are intentionally not derived here — `passed` is only authoritative
// from parliament_get_division, so the topic card shows raw aye/no counts and leaves
// the verdict to the vote card.
export function adaptTopic(data: unknown, sources: Citation[]): TopicViewModel {
  const d = data as TopicTrackerData;
  return {
    topic: d.topic,
    window: d.window,
    bills: d.bills_in_progress.map((b) => ({
      id: b.id,
      title: b.short_title,
      stage: b.current_stage,
      isAct: b.is_act,
    })),
    debates: d.recent_debates.map((x) => ({ title: x.title, house: x.house, date: x.date })),
    votes: d.recent_votes.map((v) => ({
      title: v.title,
      date: v.date,
      ayes: v.ayes,
      noes: v.noes,
    })),
    questions: d.recent_written_questions.map((q) => ({
      question: q.question,
      house: q.house,
      dateTabled: q.date_tabled,
      answered: q.answered,
    })),
    petitions: d.active_petitions.map((p) => ({ action: p.action, signatures: p.signature_count })),
    sources,
  };
}

import { getJson } from './http.js';

const BASE = 'https://petition.parliament.uk';

export type PetitionState =
  | 'open'
  | 'closed'
  | 'rejected'
  | 'awaiting_response'
  | 'with_response'
  | 'debated';

export type RawPetition = {
  type: 'petition';
  id: number;
  attributes: {
    action: string;
    background: string;
    additional_details: string | null;
    state: PetitionState;
    signature_count: number;
    created_at: string;
    closed_at: string | null;
    response_threshold_reached_at: string | null;
    debate_threshold_reached_at: string | null;
    debate?: { debated_on: string | null; transcript_url: string | null } | null;
  };
};

export type PetitionSearchParams = {
  search: string;
  state?: PetitionState | 'all';
  page?: number;
};

export async function searchPetitions(params: PetitionSearchParams): Promise<RawPetition[]> {
  const envelope = await getJson<{ data: RawPetition[] }>(`${BASE}/petitions.json`, {
    query: {
      search: params.search,
      state: params.state ?? 'open',
      page: params.page,
    },
  });
  return envelope.data ?? [];
}

export const __testing__ = { BASE };

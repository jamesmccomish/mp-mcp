import { getJson } from './http.js';

const BASE = 'https://bills-api.parliament.uk/api/v1';

export type RawBill = {
  billId: number;
  shortTitle: string;
  currentHouse: 'Commons' | 'Lords' | 'Unassigned';
  originatingHouse: 'Commons' | 'Lords';
  lastUpdate: string;
  isAct: boolean;
  isDefeated: boolean;
  currentStage: {
    description: string;
    abbreviation: string;
    house: string;
    stageSittings: Array<{ date: string }>;
  } | null;
};

export type BillSearchParams = {
  searchTerm: string;
  take?: number;
  skip?: number;
  currentHouse?: 'Commons' | 'Lords';
};

export async function searchBills(params: BillSearchParams): Promise<RawBill[]> {
  const envelope = await getJson<{ items?: RawBill[]; totalResults?: number }>(`${BASE}/Bills`, {
    query: {
      SearchTerm: params.searchTerm,
      CurrentHouse: params.currentHouse,
      Take: params.take ?? 5,
      Skip: params.skip ?? 0,
    },
  });
  return envelope.items ?? [];
}

export const __testing__ = { BASE };

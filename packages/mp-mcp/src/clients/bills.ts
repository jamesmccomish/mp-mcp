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
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function searchBills(params: BillSearchParams): Promise<RawBill[]> {
  const envelope = await getJson<{ items?: RawBill[]; totalResults?: number }>(`${BASE}/Bills`, {
    signal: params.signal,
    timeoutMs: params.timeoutMs,
    query: {
      SearchTerm: params.searchTerm,
      CurrentHouse: params.currentHouse,
      Take: params.take ?? 5,
      Skip: params.skip ?? 0,
    },
  });
  return envelope.items ?? [];
}

export type RawSponsor = {
  member?: { memberId?: number; name?: string | null; party?: string | null } | null;
  organisation?: { name?: string | null; url?: string | null } | null;
  sortOrder?: number;
};

export type RawBillDetail = RawBill & {
  longTitle: string | null;
  summary: string | null;
  sponsors: RawSponsor[] | null;
};

export async function getBill(billId: number): Promise<RawBillDetail> {
  return getJson<RawBillDetail>(`${BASE}/Bills/${billId}`);
}

export type RawBillStage = {
  id: number;
  stageId: number;
  description: string | null;
  abbreviation: string | null;
  house: string | null;
  stageSittings: Array<{ date: string | null }> | null;
  sortOrder: number;
};

export async function getBillStages(billId: number, take = 30): Promise<RawBillStage[]> {
  const envelope = await getJson<{ items?: RawBillStage[]; totalResults?: number }>(
    `${BASE}/Bills/${billId}/Stages`,
    { query: { Take: take, Skip: 0 } },
  );
  return envelope.items ?? [];
}

export const __testing__ = { BASE };

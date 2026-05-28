import type { RawVotingItem } from '../../src/clients/members.js';

export const VOTE_AYE_CLIMATE: RawVotingItem = {
  house: 1,
  id: 1001,
  title: 'Climate Change Bill: Third Reading',
  date: '2025-03-15T00:00:00',
  divisionNumber: 100,
  inAffirmativeLobby: true,
  inNegativeLobby: false,
  actedAsTeller: false,
  numberInFavour: 320,
  numberAgainst: 200,
};

export const VOTE_NO_TAX: RawVotingItem = {
  house: 1,
  id: 1002,
  title: 'Finance Bill (No. 2): Second Reading',
  date: '2025-02-10T00:00:00',
  divisionNumber: 87,
  inAffirmativeLobby: false,
  inNegativeLobby: true,
  actedAsTeller: false,
  numberInFavour: 290,
  numberAgainst: 230,
};

export const VOTE_TELLER: RawVotingItem = {
  house: 1,
  id: 1003,
  title: 'Renters Rights Bill: Lords Amendments',
  date: '2024-12-04T00:00:00',
  divisionNumber: 45,
  inAffirmativeLobby: false,
  inNegativeLobby: false,
  actedAsTeller: true,
  numberInFavour: 310,
  numberAgainst: 210,
};

export const VOTING_PAGE = [VOTE_AYE_CLIMATE, VOTE_NO_TAX, VOTE_TELLER];

export function votingEnvelope(items: RawVotingItem[]) {
  return {
    items: items.map((value) => ({ value })),
    totalResults: items.length,
  };
}

import type { RawConstituency, RawMember } from '../../src/clients/members.js';

export const HOYLE_RAW: RawMember = {
  id: 467,
  nameListAs: 'Hoyle, Sir Lindsay',
  nameDisplayAs: 'Sir Lindsay Hoyle',
  nameFullTitle: 'Rt Hon Sir Lindsay Hoyle MP',
  nameAddressAs: 'Sir Lindsay',
  latestParty: { id: 47, name: 'Speaker', abbreviation: 'Spk' },
  gender: 'M',
  latestHouseMembership: {
    membershipFrom: 'Chorley',
    membershipFromId: 3985,
    house: 1,
    membershipStartDate: '1997-05-01T00:00:00',
    membershipEndDate: null,
    membershipStatus: { statusIsActive: true, statusDescription: 'Current Member' },
  },
  thumbnailUrl: 'https://members-api.parliament.uk/api/Members/467/Thumbnail',
};

export const ABBOTT_RAW: RawMember = {
  id: 172,
  nameListAs: 'Abbott, Ms Diane',
  nameDisplayAs: 'Diane Abbott',
  nameFullTitle: 'Rt Hon Diane Abbott MP',
  nameAddressAs: null,
  latestParty: { id: 15, name: 'Labour', abbreviation: 'Lab' },
  gender: 'F',
  latestHouseMembership: {
    membershipFrom: 'Hackney North and Stoke Newington',
    membershipFromId: 3506,
    house: 1,
    membershipStartDate: '1987-06-11T00:00:00',
    membershipEndDate: null,
    membershipStatus: { statusIsActive: true, statusDescription: 'Current Member' },
  },
  thumbnailUrl: null,
};

export const CHORLEY_CONSTITUENCY: RawConstituency = {
  id: 3985,
  name: 'Chorley',
  startDate: '2024-05-31T00:00:00',
  endDate: null,
  currentRepresentation: {
    member: { value: HOYLE_RAW },
  },
};

export function memberSearchEnvelope(items: RawMember[]): {
  items: Array<{ value: RawMember }>;
  totalResults: number;
} {
  return {
    items: items.map((value) => ({ value })),
    totalResults: items.length,
  };
}

export function constituencySearchEnvelope(items: RawConstituency[]): {
  items: Array<{ value: RawConstituency }>;
  totalResults: number;
} {
  return {
    items: items.map((value) => ({ value })),
    totalResults: items.length,
  };
}

import type { RawConstituency, RawMember } from '../clients/members.js';
import type { House } from './citation.js';
import type { ConstituencySummary, MemberDetailed, MemberStatus, MemberSummary } from './member.js';

export function houseFromId(id: 1 | 2): House {
  return id === 1 ? 'Commons' : 'Lords';
}

export function memberSummary(raw: RawMember): MemberSummary {
  const membership = raw.latestHouseMembership;
  const status: MemberStatus = membership?.membershipStatus?.statusIsActive ? 'current' : 'former';
  return {
    id: raw.id,
    name: raw.nameDisplayAs,
    party: raw.latestParty?.name ?? 'Unknown',
    constituency: membership?.membershipFrom ?? null,
    house: membership ? houseFromId(membership.house) : 'Commons',
    status,
  };
}

export function memberDetailed(raw: RawMember): MemberDetailed {
  const summary = memberSummary(raw);
  const membership = raw.latestHouseMembership;
  return {
    ...summary,
    full_title: raw.nameFullTitle,
    gender: raw.gender,
    thumbnail_url: raw.thumbnailUrl,
    membership_started: membership?.membershipStartDate ?? '',
    membership_ended: membership?.membershipEndDate ?? null,
  };
}

export function constituencySummary(raw: RawConstituency): ConstituencySummary {
  const member = raw.currentRepresentation?.member?.value;
  return {
    id: raw.id,
    name: raw.name,
    start_date: raw.startDate,
    end_date: raw.endDate,
    current_member: member ? memberSummary(member) : null,
  };
}

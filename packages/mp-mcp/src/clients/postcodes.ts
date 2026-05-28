import { ParliamentToolError } from '../lib/errors.js';
import { getJson } from './http.js';

const POSTCODES_BASE = 'https://api.postcodes.io';

const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function isPostcode(input: string): boolean {
  return UK_POSTCODE_RE.test(input.trim());
}

export type PostcodeLookup = {
  postcode: string;
  parliamentaryConstituency: string;
  country: string;
  region: string | null;
};

type PostcodesIoResponse = {
  status: number;
  result: {
    postcode: string;
    parliamentary_constituency: string;
    country: string;
    region: string | null;
  } | null;
  error?: string;
};

export async function lookupPostcode(postcode: string): Promise<PostcodeLookup> {
  if (!isPostcode(postcode)) {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      `"${postcode}" does not look like a UK postcode.`,
      'Pass a UK postcode in the form "SW1A 0AA" or "SW1A0AA".',
    );
  }

  const normalised = postcode.trim().toUpperCase().replace(/\s+/g, '');
  const url = `${POSTCODES_BASE}/postcodes/${encodeURIComponent(normalised)}`;
  const response = await getJson<PostcodesIoResponse>(url);

  if (response.status !== 200 || !response.result) {
    throw new ParliamentToolError(
      'NO_CONSTITUENCY_FOUND',
      `No constituency found for postcode "${postcode}".`,
      'Confirm the postcode is correct (it must be a full UK postcode), or pass a constituency name directly.',
    );
  }

  return {
    postcode: response.result.postcode,
    parliamentaryConstituency: response.result.parliamentary_constituency,
    country: response.result.country,
    region: response.result.region,
  };
}

import { INDEXER_URL } from '@/constants';
import { validateAndNormalizeSuiAddress } from '@/utils';

import {
  ApiRequestIndexer,
  FetchNftHolder,
  IndexerNFTResponse,
} from './indexer.types';

export async function apiRequestIndexer({
  query,
  apiKey,
  userApiKey,
}: ApiRequestIndexer): Promise<any> {
  const result = await fetch(INDEXER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-user': apiKey,
      'x-api-key': userApiKey,
    },
    body: JSON.stringify({ query }),
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((result: any) => {
      return result;
    });
  return result;
}

export const fetchNftHolder = async ({
  collectionId,
  offset,
}: FetchNftHolder): Promise<Set<string>> => {
  const holders = new Set<string>();

  const query = `
    query {
        sui {
            nfts(
                where: {
                    collection: { id: { _eq: "${collectionId}" } }
                },
                distinct_on: [ owner ]
                offset: ${offset}
            ) {
                owner
            }
        }
    }
    `;

  const response = await fetch(`api/indexer?indexerQuery=${query}`);

  const result = await response.json();

  if (!result?.data?.sui?.nfts) {
    throw new Error(
      `[fetchHolders] unexpected result: ${JSON.stringify(result)}`
    );
  }

  const nfts = result.data.sui.nfts;

  if (nfts.length === 0) return holders;

  nfts.forEach((elem: IndexerNFTResponse) => {
    if (elem.owner && validateAndNormalizeSuiAddress(elem.owner))
      holders.add(elem.owner);
  });

  return holders;
};

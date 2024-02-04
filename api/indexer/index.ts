import { INDEXER_URL } from '@/constants';
import { validateAndNormalizeSuiAddress } from '@/utils';

import {
  ApiRequestIndexer,
  FetchNftHolder,
  IndexerNFTResponse,
} from './indexer.types';

export const apiRequestIndexer = ({
  query,
  apiKey,
  userApiKey,
}: ApiRequestIndexer): Promise<any> =>
  fetch(INDEXER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-user': userApiKey,
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ query }),
  })
    .then((response: Response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      return response.json();
    })
    .then((result) => result);

export const fetchNftHolder = async ({
  collectionId,
  limit,
}: FetchNftHolder): Promise<Array<string>> => {
  try {
    const holders = new Set<string>();

    const query = `
      query {
          sui {
              nfts(
                  where: {
                    collection_id: { _eq: "${collectionId}" }
                  },
                  distinct_on: [ owner ]
                  offset: 0
                  limit: ${limit}
              ) {
                  owner
              }
          }
      }
    `;

    const response = await fetch(`${process.env.DOMAIN}/api/v1/indexer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    const result = await response.json();

    if (!result?.data?.data?.sui?.nfts) {
      throw new Error(
        `[fetchHolders] unexpected result: ${JSON.stringify(result)}`
      );
    }

    const nfts = result.data.data.sui.nfts;

    if (nfts.length === 0) return [];

    nfts.forEach((elem: IndexerNFTResponse) => {
      if (elem.owner && validateAndNormalizeSuiAddress(elem.owner))
        holders.add(elem.owner);
    });

    return Array.from(holders);
  } catch (e) {
    console.log(e);
    return [];
  }
};

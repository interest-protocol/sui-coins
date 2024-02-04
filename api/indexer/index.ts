import { INDEXER_URL } from '@/constants';
import { NFT } from '@/constants/nft';
import { sleep, validateAndNormalizeSuiAddress } from '@/utils';

import {
  ApiRequestIndexer,
  FetchNftHolder,
  IndexerNFTResponse,
} from './indexer.types';

const ONE_MINUTE_IN_MS = 60000;
const REQUEST_PER_MINUTE = 100;
const PARALLEL_REQUESTS = NFT.length;

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

    for await (const offset of Array.from(
      { length: limit / 25 },
      (_, index) => index
    )) {
      await sleep((ONE_MINUTE_IN_MS * PARALLEL_REQUESTS) / REQUEST_PER_MINUTE);

      const query = `
      query {
          sui {
              nfts(
                  where: {
                    collection_id: { _eq: "${collectionId}" }
                  },
                  distinct_on: [ owner ]
                  offset: ${offset}
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
    }

    return Array.from(holders);
  } catch (e) {
    console.log(e);
    return [];
  }
};

import { INDEXER_URL } from '@/constants';
import { NFT } from '@/constants/nft';
import { NFTCollectionMetadata } from '@/interface';
import { sleep, validateAndNormalizeSuiAddress } from '@/utils';

import {
  ApiRequestIndexer,
  FetchNftHolder,
  IndexerNFTMetadataResponse,
  IndexerNFTResponse,
} from './indexer.types';

const ONE_MINUTE_IN_MS = 60000;
const REQUEST_PER_MINUTE = 100;
const TOTAL_REQUESTS = NFT.length;

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

const fetchNftHolder = async ({
  collectionId,
  offset,
}: FetchNftHolder): Promise<Array<string>> => {
  try {
    const query = `
        query {
            sui {
                nfts(
                    where: {
                      collection_id: { _eq: "${collectionId}" }
                    }
                    limit: 25
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

    if (!nfts.length) return [];

    return nfts
      .map(({ owner }: IndexerNFTResponse) =>
        owner && validateAndNormalizeSuiAddress(owner) ? owner : null
      )
      .filter((value: string | null) => !!value);
  } catch {
    return [];
  }
};

export const fetchAllHolders = async (
  collectionId: string,
  limit: number,
  nftsSizes: ReadonlyArray<number>
) => {
  const allHolders: Array<string> = [];

  for await (const offset of Array.from(
    { length: ~~(limit / 25) + 1 },
    (_, index) => index * 25
  )) {
    const parallelRequest =
      TOTAL_REQUESTS -
      nftsSizes.reduce((acc, size) => acc + (offset > size ? 1 : 0), 0);

    await sleep((ONE_MINUTE_IN_MS * parallelRequest) / REQUEST_PER_MINUTE);

    const holders = await fetchNftHolder({ collectionId, offset });

    allHolders.push(...holders);
  }
  return allHolders;
};

export const fetchNftMetadata = async (
  collectionId: string
): Promise<NFTCollectionMetadata | null> => {
  try {
    const query = `
      query{
        sui {
          collections(
            where: {id: {_eq: "${collectionId}" } }
          ) {
            id
            supply
            title
            cover_url
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

    if (!result?.data?.data?.sui?.collections) {
      throw new Error(
        `[fetchMetadata] unexpected result: ${JSON.stringify(result)}`
      );
    }

    const metadata = result.data.data.sui.collections[0];

    if (!metadata)
      throw new Error(
        `[fetchMetadata] nothing found: ${JSON.stringify(result)}`
      );

    const { id, title, supply, cover_url } =
      metadata as IndexerNFTMetadataResponse;

    return {
      id,
      name: title,
      total: supply,
      img: cover_url,
    };
  } catch (e) {
    return null;
  }
};

export const fetchAllNftMetadata = async (): Promise<
  ReadonlyArray<NFTCollectionMetadata>
> => {
  try {
    const query = `
      query{
        sui {
          collections(
            where: {id: {_in: ${JSON.stringify(NFT)}}}
          ) {
            id
            supply
            title
            cover_url
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

    if (!result?.data?.data?.sui?.collections) {
      throw new Error(
        `[fetchAllMetadata] unexpected result: ${JSON.stringify(result)}`
      );
    }

    const metadata = result.data.data.sui.collections;

    if (!metadata.length) return [];

    return metadata.map(
      ({ id, cover_url, supply, title }: IndexerNFTMetadataResponse) => ({
        id,
        name: title,
        total: supply,
        img: cover_url,
      })
    );
  } catch {
    return [];
  }
};

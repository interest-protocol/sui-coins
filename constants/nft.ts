import { NFTCollectionMetadata } from '@/interface';

export const NFT: ReadonlyArray<NFTCollectionMetadata> = [
  {
    id: '4827d37b-5574-404f-b030-d26912ad7461',
    name: 'Fuddies',
    total: 10_000,
    img: '/images/nft/fuddies.png',
  },
  {
    id: '5830cc88-e420-43bb-a309-16b3ae2bf48d',
    name: 'DeSuiLabs',
    total: 2_222,
    img: '/images/nft/de-sui-labs.webp',
  },
  {
    id: '307c7e7a-be3a-43a5-ae44-37f3a37d01f9',
    name: 'DSL Legacy',
    total: 222,
    img: '/images/nft/dsl-legacy.webp',
  },
  {
    id: 'c3d1ce36-6afd-4336-b619-44c745dd7569',
    name: 'Egg',
    total: 1_172,
    img: '/images/nft/egg.webp',
  },
  {
    id: 'd5ea5c61-5a91-40f2-9837-a1912a2083a1',
    name: 'Tail by Typus',
    total: 2_222,
    img: '/images/nft/tail-by-typus.webp',
  },
  {
    id: '09d26434-4449-45eb-b848-89c30bec2e12',
    name: 'Unchained Esports',
    total: 4_444,
    img: '/images/nft/unchained-esports.webp',
  },
];

export const NFT_MAP: Record<string, NFTCollectionMetadata> = NFT.reduce(
  (acc, curr) => ({ ...acc, [curr.id]: curr }),
  {}
);

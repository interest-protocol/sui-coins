import useSWR from 'swr';

import { NFTCollection } from '@/interface';

const useNFTCollections = () =>
  useSWR<ReadonlyArray<NFTCollection>>(useNFTCollections.name, () =>
    fetch(`/api/v1/nft-collection`).then((res) => res.json())
  );

export default useNFTCollections;

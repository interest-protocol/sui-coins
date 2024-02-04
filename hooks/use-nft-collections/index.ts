import { useId } from 'react';
import useSWR from 'swr';

import { NFTCollection } from '@/interface';

const useNFTCollections = () =>
  useSWR<ReadonlyArray<NFTCollection>>(useId(), () =>
    fetch(`/api/v1/nft-collection`).then((res) => res.json())
  );

export default useNFTCollections;

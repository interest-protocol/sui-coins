import { useId } from 'react';
import useSWR from 'swr';

import { NFTCollectionMetadata } from '@/interface';

const useNftsMetadata = () =>
  useSWR<ReadonlyArray<NFTCollectionMetadata>>(useId(), () =>
    fetch('/api/auth/v1/nft-collection-metadata').then((res) => res.json())
  );

export default useNftsMetadata;

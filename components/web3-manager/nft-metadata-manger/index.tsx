import { FC, useId } from 'react';
import useSWR from 'swr';

import { useNFTMetadata } from '@/hooks/use-nft-metadata';

const NFTMetadataManager: FC = () => {
  const { updateNFTMetadata, updateError, updateLoading } = useNFTMetadata();

  useSWR(useId(), async () => {
    updateError(false);
    updateLoading(true);
    try {
      const data = await fetch('/api/auth/v1/nft-collection-metadata').then(
        (res) => res.json()
      );

      updateNFTMetadata(data);
    } catch {
      updateError(true);
    } finally {
      updateLoading(false);
    }
  });

  return null;
};

export default NFTMetadataManager;

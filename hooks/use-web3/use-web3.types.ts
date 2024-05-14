import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';

import { UseNFTMetadataResponse } from '../use-nft-metadata/use-nft-metadata.types';
import { UseObjectsResponse } from '../use-objects/use-objects.types';
import { UseCoinsResponse } from './../use-coins/use-coins.types';

export interface UseWeb3Response
  extends Pick<UseCoinsResponse, 'coinsMap' | 'coins'>,
    Pick<UseNFTMetadataResponse, 'nftsMap' | 'nfts'>,
    Pick<UseObjectsResponse, 'ownedNfts' | 'otherObjects' | 'coinsObjects'> {
  error: boolean;
  loading: boolean;
  objects: ReadonlyArray<ObjectData>;
}

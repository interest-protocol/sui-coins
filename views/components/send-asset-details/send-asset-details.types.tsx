import type { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';

import type { Network } from '@/constants';

export interface SendAssetDetailsProps {
  index: number;
  network: Network;
  assets: LinkAssets;
}

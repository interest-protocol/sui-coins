import { LinkAssets } from '@mysten/zksend/dist/cjs/links/utils';

import type { Network } from '@/constants';

export interface SendAssetDetailsProps {
  network: Network;
  assets: LinkAssets;
}

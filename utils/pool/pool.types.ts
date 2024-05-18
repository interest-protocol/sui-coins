import { InterestPool } from '@interest-protocol/clamm-sdk';

import { Network } from '@/constants';

export interface handleCustomPoolsArgs {
  network: Network;
  pool: InterestPool;
}

export interface IsScallopPoolArgs {
  network: Network;
  poolObjectId: string;
}

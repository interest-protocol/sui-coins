import { SuiClient } from '@mysten/sui.js/client';

export type TGetOwned = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<{ type: string; objectId: string }>>;

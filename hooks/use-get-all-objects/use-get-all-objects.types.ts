import { SuiClient, SuiObjectResponse } from '@mysten/sui.js/client';

export type TGetAllObjects = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<SuiObjectResponse>>;

export interface ObjectData {
  type: string;
  objectId: string;
  display?: Record<string, string> | undefined | null;
}

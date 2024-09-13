import { SuinsClient } from '@mysten/suins';

export interface ISuiNsContext {
  loading: boolean;
  suinsClient: SuinsClient;
  names: Record<string, string[]>;
  images: Record<string, string>;
}

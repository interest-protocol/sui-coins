import { SuinsClient } from '@mysten/suins';

export interface ISuiNsContext {
  loading: boolean;
  provider: SuinsClient;
  names: Record<string, string[]>;
  images: Record<string, string>;
}

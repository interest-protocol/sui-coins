import { SuinsClient } from '@mysten/suins-toolkit';

export interface ISuiNsContext {
  loading: boolean;
  provider: SuinsClient;
  names: Record<string, string>;
}

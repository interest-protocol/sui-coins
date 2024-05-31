import { UseCoinsResponse } from './../use-coins/use-coins.types';

export interface UseWeb3Response
  extends Pick<UseCoinsResponse, 'coinsMap' | 'delay' | 'coins'> {
  error: boolean;
  loading: boolean;
  mutate: () => void;
  setDelay: (interval: number | undefined) => void;
}

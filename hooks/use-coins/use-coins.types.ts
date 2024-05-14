import {
  CoinObject,
  CoinsMap,
} from '../../components/web3-manager/coins-manager/web3-manager.types';

export interface UseCoinsResponse {
  id: string;
  error: boolean;
  loading: boolean;
  coinsMap: CoinsMap;
  refresh: () => void;
  delay: number | undefined;
  coins: ReadonlyArray<CoinObject>;
  updateError: (data: boolean) => void;
  updateCoins: (data: CoinsMap) => void;
  updateLoading: (data: boolean) => void;
  updateDelay: (delay: number | undefined) => void;
}

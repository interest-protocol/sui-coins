import {
  CoinObject,
  CoinsMap,
} from '../../components/web3-manager/coins-manager/web3-manager.types';

export interface UseCoinsResponse {
  error: boolean;
  loading: boolean;
  coinsMap: CoinsMap;
  coins: ReadonlyArray<CoinObject>;
  updateError: (data: boolean) => void;
  updateCoins: (data: CoinsMap) => void;
  updateLoading: (data: boolean) => void;
}

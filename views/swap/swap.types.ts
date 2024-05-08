import { WalletAccount } from '@wallet-standard/base';
import { UseFormReturn } from 'react-hook-form';

import { Network } from '@/constants';
import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinData } from '@/interface';
import {
  PoolsMap,
  RouteWithAmount,
} from '@/views/swap/swap-manager/swap-manager.types';

export interface ISwapSettings {
  slippage: string;
}

export interface SwapToken extends CoinData {
  value: string;
  usdPrice: number | null;
  isFetchingSwap?: boolean;
}

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  settings: ISwapSettings;
  lock: boolean;
  error?: string | null;
  loading: boolean;
  maxValue: boolean;
  disabled: boolean;
  routeWithAmount: RouteWithAmount | [];
  readyToSwap: boolean;
  poolsMap: PoolsMap | null | undefined;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}

export interface SwapArgs {
  currentAccount: WalletAccount | null;
  coinsMap: CoinsMap;
  formSwap: UseFormReturn<SwapForm>;
  network: Network;
  isZeroSwap?: boolean;
}

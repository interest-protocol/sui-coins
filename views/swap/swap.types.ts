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
  interval: string;
  slippage: string;
  aggregator: Aggregator;
}

export interface SwapToken extends CoinData {
  value: string;
  usdPrice: number | null;
  isFetchingSwap?: boolean;
}

interface SwapTypeArgs {
  coinIn: string;
  coinOut: string;
  lpCoin: string;
}

export enum Aggregator {
  Interest = 'Interest',
}

export type SwapPath = ReadonlyArray<SwapTypeArgs>;

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
  focus: boolean;
  swapping: boolean;
}

export interface AggregatorProps {
  url: string;
  logo: string;
  name: string;
  shortName: 'Interest';
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

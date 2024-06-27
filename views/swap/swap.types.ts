import { WalletAccount } from '@wallet-standard/base';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SVGProps } from '@/components/svg/svg.types';
import { CoinsMap } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { Network } from '@/constants';
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

interface SwapTypeArgs {
  coinIn: string;
  coinOut: string;
  lpCoin: string;
}

export enum Aggregator {
  Interest = 'interest',
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
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
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

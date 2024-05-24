import { SuiClient } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants';
import { AmmPool } from '@/interface';
import {
  CoinPath,
  Dex,
  PoolObjectIdPath,
  Routes,
} from '@/utils/router/router.types';

import { SwapForm } from '../swap.types';

export interface SwapMessagesProps {
  error: boolean;
  hasNoMarket: boolean;
  control: Control<SwapForm>;
  isZeroSwapAmountIn: boolean;
  isZeroSwapAmountOut: boolean;
  isFetchingSwapAmountIn: boolean;
  isFetchingSwapAmountOut: boolean;
}

export interface SwapManagerProps {
  type: string;
  name: 'from' | 'to';
  setValueName: 'from' | 'to';
  hasNoMarket: boolean;
  account: string | null;
  control: Control<SwapForm>;
  isFetchingSwapAmount: boolean;
  routes: Routes;
  setValue: UseFormSetValue<SwapForm>;
  setError: Dispatch<SetStateAction<boolean>>;
  setIsFetchingSwapAmount: (value: boolean) => void;
  setIsZeroSwapAmount: Dispatch<SetStateAction<boolean>>;
  poolsMap: PoolsMap;
}

export interface UseGetDexArgs {
  coinInType: string;
  coinOutType: string;
}

export interface BestRoute {
  highest: BigNumber;
  route: RouteWithAmount;
}

export type PoolsMap = Record<string, AmmPool>;

export interface UseGetDexReturn {
  poolsMap: PoolsMap;
  dex: Dex;
}

export interface FindAmountArgs {
  client: SuiClient;
  routes: Routes;
  amount: string;
  isAmountIn: boolean;
  poolsMap: PoolsMap;
  network: Network;
}

export interface RouteAmount {
  isAmountIn: boolean;
  amount: BigNumber;
}

export type RouteWithAmount = [CoinPath, PoolObjectIdPath, RouteAmount];

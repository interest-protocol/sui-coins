import { SuiClient } from '@mysten/sui.js/client';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Network } from '@/constants/network';

import { SwapForm, SwapPath } from '../swap.types';

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
  swapPaths: ReadonlyArray<SwapPath>;
  setValue: UseFormSetValue<SwapForm>;
  setError: Dispatch<SetStateAction<boolean>>;
  setIsFetchingSwapAmount: (value: boolean) => void;
  setIsZeroSwapAmount: Dispatch<SetStateAction<boolean>>;
}

export interface FindSwapPathArgs {
  network: Network;
  coinInType: string;
  coinOutType: string;
}

export interface QuoteAmountArgs {
  amount: string;
  network: Network;
  client: SuiClient;
  swapPath: SwapPath;
}

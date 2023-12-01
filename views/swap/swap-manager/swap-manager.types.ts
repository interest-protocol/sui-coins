import { SuiClient } from '@mysten/sui.js/client';
import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

import { SwapForm, SwapPath } from '../swap.types';

export interface SwapMessagesProps {
  error: boolean;
  hasNoMarket: boolean;
  control: Control<SwapForm>;
  isZeroSwapAmountIn: boolean;
  isZeroSwapAmountOut: boolean;
  errors: FieldErrors<SwapForm>;
  isFetchingSwapAmountIn: boolean;
  isFetchingSwapAmountOut: boolean;
  setError: UseFormSetError<SwapForm>;
}

export interface SwapManagerProps {
  type: string;
  name: 'from' | 'to';
  setValueName: 'from' | 'to';
  hasNoMarket: boolean;
  account: string | null;
  control: Control<SwapForm>;
  isFetchingSwapAmount: boolean;
  setValue: UseFormSetValue<SwapForm>;
  setError: Dispatch<SetStateAction<boolean>>;
  setIsZeroSwapAmount: Dispatch<SetStateAction<boolean>>;
  setIsFetchingSwapAmount: Dispatch<SetStateAction<boolean>>;
  swapPaths: ReadonlyArray<SwapPath>;
}

export interface FindSwapPathArgs {
  coinInType: string;
  coinOutType: string;
}

export interface QuoteAmountArgs {
  client: SuiClient;
  swapPath: SwapPath;
  amount: string;
}

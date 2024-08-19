import { TimeScale } from '@interest-protocol/dca-sdk';
import type { Token } from '@interest-protocol/sui-tokens';
import type BigNumber from 'bignumber.js';

export interface IDCASettings {
  slippage: string;
  interval: string;
}

export interface DCAToken extends Token {
  display: string;
  value: BigNumber;
}

export interface DCAForm {
  min: string;
  max: string;
  to: DCAToken;
  from: DCAToken;
  orders: number;
  loading: boolean;
  starting: boolean;
  intervals: number;
  iterations: number;
  price: string | null;
  explorerLink: string;
  error: string | null;
  periodicity: TimeScale;
  fetchingPrices: boolean;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

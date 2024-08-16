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
  min: {
    display: string;
    value: BigNumber;
  };
  max: {
    display: string;
    value: BigNumber;
  };
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

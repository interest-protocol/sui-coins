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
  starting: boolean;
  intervals: number;
  price: string | null;
  error: string | null;
  explorerLink: string;
  periodicity: TimeScale;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

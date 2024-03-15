import { Token } from '@interest-protocol/sui-tokens';
import { RouterCompleteTradeRoute, RouterTradePath } from 'aftermath-ts-sdk';

export type Period = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month';

export interface DCASettings {
  minPrice?: number;
  maxPrice?: number;
  periodicity: Period;
  intervals: `${number}`;
  iterations: `${number}`;
}

export interface DCAToken extends Token {
  value: string;
  usdPrice: number | null;
}

export interface DCAForm {
  to: DCAToken;
  from: DCAToken;
  loading: boolean;
  error: string | null;
  settings: DCASettings;
  route: RouterCompleteTradeRoute | null;
  swapPath: ReadonlyArray<RouterTradePath>;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

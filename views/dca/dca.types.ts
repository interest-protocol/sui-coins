import { Token } from '@interest-protocol/sui-tokens';

export enum Period {
  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
}

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
  error: string | null;
  settings: DCASettings;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

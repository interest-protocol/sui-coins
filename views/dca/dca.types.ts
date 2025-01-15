import { TimeScale } from '@interest-protocol/dca-sdk';
import type { Token } from '@interest-protocol/sui-tokens';
import type BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface IDCASettings {
  slippage: string;
  interval: string;
}

export interface DCAToken extends Token {
  display: string;
  value: BigNumber;
  usdValue?: number;
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
  executionTime: number;
  periodicity: TimeScale;
  aggregator: Aggregator;
  isToCustomRecipient: boolean;
  customRecipientAddress: string;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

export enum Aggregator {
  Hop,
  Aftermath,
}

export interface AggregatorProps {
  url: string;
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
  disabled?: boolean;
}

export interface DCAAggregatorFormProps {
  handleManageView: () => void;
}

export interface DCAAggregatorHeaderProps extends DCAAggregatorFormProps {
  isOpen: boolean;
  handleManageView: () => void;
}

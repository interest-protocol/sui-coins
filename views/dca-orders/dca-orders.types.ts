import { TimeScale } from '@interest-protocol/dca-sdk';

import { DCAOrder } from '@/hooks/use-dca/use-dca.types';
import { CoinMetadataWithType } from '@/interface';

export interface DCAOrderListItemProps {
  id: string;
  max: number;
  min: number;
  owner: string;
  every: number;
  start: number;
  active: boolean;
  cooldown: number;
  delegatee: string;
  lastTrade: number;
  feePercent: number;
  timeScale: TimeScale;
  inputBalance: number;
  amountPerTrade: number;
  input: { name: string };
  remainingOrders: number;
  output: { name: string };
}

export interface DCAOrderDetailedItemProps
  extends Pick<
    DCAOrderListItemProps,
    'min' | 'max' | 'every' | 'timeScale' | 'amountPerTrade'
  > {
  isOpen: boolean;
  totalOrders: number;
  orders: ReadonlyArray<DCAOrder>;
  coins: [CoinMetadataWithType | null, CoinMetadataWithType | null];
}

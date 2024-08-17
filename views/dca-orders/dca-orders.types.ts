import type { TimeScale } from '@interest-protocol/dca-sdk';
import type { KeyedMutator } from 'swr';

import type { DCAOrder } from '@/hooks/use-dca/use-dca.types';
import type { CoinMetadataWithType } from '@/interface';

export interface DCAOrderListItemProps {
  id: string;
  min: string;
  max: string;
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
  mutate: KeyedMutator<[any, any] | undefined>;
}

export interface DCAOrderDetailedItemProps
  extends Pick<
    DCAOrderListItemProps,
    | 'min'
    | 'max'
    | 'every'
    | 'timeScale'
    | 'amountPerTrade'
    | 'cooldown'
    | 'lastTrade'
    | 'start'
  > {
  isOpen: boolean;
  totalOrders: number;
  orders: ReadonlyArray<DCAOrder>;
  coins: [CoinMetadataWithType | null, CoinMetadataWithType | null];
}

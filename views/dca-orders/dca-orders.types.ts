import { TimeScale } from '@interest-protocol/dca-sdk';

import { DCAOrder } from '@/hooks/use-dca/use-dca.types';
import { CoinMetadataWithType } from '@/interface';

export interface DCAOrderListItemProps {
  active: boolean;
  amountPerTrade: number;
  cooldown: number;
  delegatee: string;
  every: number;
  feePercent: number;
  id: string;
  input: {
    name: string;
  };
  inputBalance: number;
  lastTrade: number;
  max: number;
  min: number;
  output: {
    name: string;
  };
  owner: string;
  remainingOrders: number;
  timeScale: TimeScale;
}

export interface DCAOrderDetailedItemProps
  extends Pick<DCAOrderListItemProps, 'min' | 'max' | 'every' | 'timeScale'> {
  isOpen: boolean;
  totalOrders: number;
  orders: ReadonlyArray<DCAOrder>;
  coins: [CoinMetadataWithType | null, CoinMetadataWithType | null];
}

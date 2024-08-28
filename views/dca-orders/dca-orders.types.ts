import type { KeyedMutator } from 'swr';

import type { DCA, DCAOrder, Paginated } from '@/hooks/use-dca/use-dca.types';
import type { CoinMetadataWithType } from '@/interface';

export interface DCAOrderListItemProps extends DCA {
  selected: boolean;
  toggleSelectOrder: (id: string) => void;
  mutate: KeyedMutator<[Paginated<DCA>, Paginated<DCA>] | null>;
}

export interface DCAOrderDetailedItemProps
  extends Pick<
    DCA,
    | 'min'
    | 'max'
    | 'every'
    | 'timeScale'
    | 'amountPerTrade'
    | 'cooldown'
    | 'lastTrade'
    | 'start'
    | 'active'
    | 'remainingOrders'
  > {
  isOpen: boolean;
  totalOrders: number;
  orders: ReadonlyArray<DCAOrder>;
  coins: [CoinMetadataWithType | null, CoinMetadataWithType | null];
}

export interface DCAOrdersState {
  selectedId: string | null;
  selectId: (id: string | null) => void;
}

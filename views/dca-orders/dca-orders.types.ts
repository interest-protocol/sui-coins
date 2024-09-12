import type { KeyedMutator } from 'swr';

import type { DCA, DCAOrder, Paginated } from '@/hooks/use-dca/use-dca.types';
import type { CoinMetadataWithType } from '@/interface';

export interface DCAOrderListItemProps extends DCA {
  selected: boolean;
  toggleSelectOrder: (id: string) => void;
  mutate: KeyedMutator<[Paginated<DCA>, Paginated<DCA>] | null>;
}

export interface DCAOrderDetailedItemProps {
  id: string;
}

export interface DCAShortInfo
  extends Pick<
    DCA,
    | 'id'
    | 'start'
    | 'active'
    | 'inputBalance'
    | 'remainingOrders'
    | 'totalOrders'
  > {
  input: string;
  output: string;
}

export interface EnhancedDCA extends Omit<DCA, 'input' | 'output'> {
  input: string;
  output: string;
}

export interface DCAOrdersState {
  loading: boolean;
  isOrdersView: boolean;
  mutateDCAs: () => void;
  selectedId: string | null;
  dcaOrders: ReadonlyArray<DCAOrder>;
  selectId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  activeDcas: ReadonlyArray<DCAShortInfo>;
  detailedDcas: Record<string, EnhancedDCA>;
  inactiveDcas: ReadonlyArray<DCAShortInfo>;
  setMutateDCAs: (mutate: () => void) => void;
  setIsOrdersView: (isOrdersView: boolean) => void;
  coinsMetadata: Record<string, CoinMetadataWithType>;
  setDCAOrders: (dcaOrders: ReadonlyArray<DCAOrder>) => void;
  setActiveDcas: (activeDcas: ReadonlyArray<DCAShortInfo>) => void;
  setDetailedDcas: (detailedDcas: Record<string, EnhancedDCA>) => void;
  setInactiveDcas: (inactiveDcas: ReadonlyArray<DCAShortInfo>) => void;
  setCoinsMetadata: (
    coinsMetadata: Record<string, CoinMetadataWithType>
  ) => void;
}

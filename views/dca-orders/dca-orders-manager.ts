import { normalizeStructTag } from '@mysten/sui/utils';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { create } from 'zustand';

import { useDcaOrders, useDcas } from '@/hooks/use-dca';
import { DCAOrder } from '@/hooks/use-dca/use-dca.types';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata } from '@/utils';

import { DCAOrdersState, DCAShortInfo, EnhancedDCA } from './dca-orders.types';

export const useDCAState = create<DCAOrdersState>((set) => ({
  dcaOrders: [],
  loading: false,
  activeDcas: [],
  selectedId: '',
  inactiveDcas: [],
  detailedDcas: {},
  coinsMetadata: {},
  isOrdersView: false,
  mutateDCAs: () => {},
  setLoading: (loading: boolean) => set({ loading }),
  setMutateDCAs: (mutateDCAs: () => void) => set({ mutateDCAs }),
  setIsOrdersView: (isOrdersView: boolean) => set({ isOrdersView }),
  setDCAOrders: (dcaOrders: ReadonlyArray<DCAOrder>) => set({ dcaOrders }),
  setDetailedDcas: (detailedDcas: Record<string, EnhancedDCA>) =>
    set({ detailedDcas }),
  setCoinsMetadata: (coinsMetadata: Record<string, CoinMetadataWithType>) =>
    set({ coinsMetadata }),
  selectId: (id: string | null) =>
    set(({ selectedId }) => ({
      isOrdersView: false,
      selectedId: !id || id === selectedId ? null : id,
    })),
  setActiveDcas: (activeDcas: ReadonlyArray<DCAShortInfo>) =>
    set({ activeDcas }),
  setInactiveDcas: (inactiveDcas: ReadonlyArray<DCAShortInfo>) =>
    set({ inactiveDcas }),
}));

export const DCAOrdersManager: FC = () => {
  const network = useNetwork();
  const { asPath } = useRouter();
  const { data: dcas, mutate: mutateDCA, isLoading } = useDcas();
  const {
    selectId,
    selectedId,
    setLoading,
    setDCAOrders,
    setActiveDcas,
    setMutateDCAs,
    setInactiveDcas,
    setDetailedDcas,
    setCoinsMetadata,
  } = useDCAState();

  const { data: dcaOrders, mutate: mutateDCAOrders } = useDcaOrders(
    selectedId ?? ''
  );

  useEffect(() => {
    const params = new URLSearchParams(asPath);
    selectId(params.get('id') || null);
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!dcas || !dcas[0] || !dcas[1]) return;

    setMutateDCAs(() => {
      mutateDCA();
      mutateDCAOrders();
    });

    setActiveDcas(
      dcas[0].data.map(
        ({
          id,
          start,
          input,
          output,
          active,
          totalOrders,
          inputBalance,
          remainingOrders,
        }) => ({
          id,
          start,
          active,
          totalOrders,
          inputBalance,
          remainingOrders,
          input: normalizeStructTag(input.name),
          output: normalizeStructTag(output.name),
        })
      )
    );

    setInactiveDcas(
      dcas[1].data.map(
        ({
          id,
          start,
          input,
          output,
          active,
          totalOrders,
          inputBalance,
          remainingOrders,
        }) => ({
          id,
          start,
          active,
          totalOrders,
          inputBalance,
          remainingOrders,
          input: normalizeStructTag(input.name),
          output: normalizeStructTag(output.name),
        })
      )
    );

    setDetailedDcas(
      dcas
        .flatMap((list) => list.data)
        .reduce(
          (
            acc,
            { input: { name: input }, output: { name: output }, ...dca }
          ) => ({
            ...acc,
            [dca.id]: {
              ...dca,
              input: normalizeStructTag(input),
              output: normalizeStructTag(output),
            },
          }),
          {}
        )
    );

    fetchCoinMetadata({
      network,
      types: Array.from(
        new Set(
          dcas
            .flatMap((list) => list.data)
            .flatMap(({ input: { name: input }, output: { name: output } }) => [
              normalizeStructTag(input),
              normalizeStructTag(output),
            ])
        )
      ),
    }).then((data) =>
      setCoinsMetadata(
        data.reduce(
          (acc, metadata) => ({ ...acc, [metadata.type]: metadata }),
          {}
        )
      )
    );

    dcas
      .flatMap((list) => list.data)
      .reduce((acc, dca) => ({ ...acc, [dca.id]: dca }), {});
  }, [dcas]);

  useEffect(() => {
    setDCAOrders(dcaOrders ?? []);
  }, [dcaOrders]);

  return null;
};

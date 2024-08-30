import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { create } from 'zustand';

import { DCAOrdersState } from './dca-orders.types';

export const useDCAOrdersState = create<DCAOrdersState>((set) => ({
  selectedId: '',
  selectId: (id: string | null) =>
    set(({ selectedId }) => ({
      selectedId: !id || id === selectedId ? null : id,
    })),
}));

export const DCAOrdersManager: FC = () => {
  const { asPath } = useRouter();
  const { selectId } = useDCAOrdersState();

  useEffect(() => {
    const params = new URLSearchParams(asPath);
    selectId(params.get('id') || null);
  }, []);

  return null;
};

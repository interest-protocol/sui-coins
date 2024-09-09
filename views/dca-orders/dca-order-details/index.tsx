import { FC } from 'react';

import { DCA } from '@/hooks/use-dca/use-dca.types';

import { useDCAState } from '../dca-orders-manager';
import DCAOrderDetailsContent from './dca-order-details-content';

const DCAOrderDetails: FC<Pick<DCA, 'id'>> = ({ id }) => {
  const { selectedId } = useDCAState();

  if (selectedId !== id) return null;

  return <DCAOrderDetailsContent />;
};

export default DCAOrderDetails;

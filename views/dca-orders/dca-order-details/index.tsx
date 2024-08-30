import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useIsFirstRender } from '@/hooks/use-is-first-render';

import { DCAOrderDetailedItemProps } from '../dca-orders.types';
import DCAOrderDetailsContent from './dca-order-details-content';

const DCAOrderDetails: FC<DCAOrderDetailedItemProps> = (props) => {
  const { isOpen } = props;

  const isFirstRender = useIsFirstRender();

  return (
    <Motion
      key={v4()}
      style={{ originY: 0 }}
      transition={{ ease: 'easeIn' }}
      initial={{
        scaleY: isOpen ? 0 : 1,
        opacity: isOpen ? 1 : 0,
        height: isOpen && !isFirstRender ? 'auto' : 0,
      }}
      animate={{
        scaleY: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0,
      }}
    >
      <DCAOrderDetailsContent {...props} />
    </Motion>
  );
};

export default DCAOrderDetails;

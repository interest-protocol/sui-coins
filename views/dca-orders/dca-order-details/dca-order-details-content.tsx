import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import DetailsTabs from '@/views/components/detail-tabs';

import { useDCAState } from '../dca-orders-manager';
import DCAOrderDetailsOrders from './dca-order-details-orders';
import DCAOrderDetailsOverview from './dca-order-details-overview';

const DCAOrderDetailsContent: FC = () => {
  const { isOrdersView, setIsOrdersView } = useDCAState();

  return (
    <Box py={['m', 'm', 'xl']} px={['s', 's', 'xl']} gap="3xl">
      <DetailsTabs
        stretch={false}
        onChangeTab={(index) => setIsOrdersView(Boolean(index))}
        defaultTabIndex={Number(isOrdersView)}
        items={[
          <Typography variant="label" size="large" key={v4()}>
            Overview
          </Typography>,
          <Typography variant="label" size="large" key={v4()}>
            Orders
          </Typography>,
        ]}
      />
      <Box gap="m" mt="l" display="flex" flexDirection="column">
        {isOrdersView ? <DCAOrderDetailsOrders /> : <DCAOrderDetailsOverview />}
      </Box>
    </Box>
  );
};

export default DCAOrderDetailsContent;

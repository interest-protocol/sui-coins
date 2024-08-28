import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import DetailsTabs from '@/views/components/detail-tabs';

import { DCAOrderDetailedItemProps } from '../dca-orders.types';
import DCAOrderDetailsOrders from './dca-order-details-orders';
import DCAOrderDetailsOverview from './dca-order-details-overview';

const DCAOrderDetailsContent: FC<DCAOrderDetailedItemProps> = (props) => {
  const [index, setIndex] = useState(0);

  return (
    <Box p="xl" gap="3xl">
      <DetailsTabs
        stretch={false}
        onChangeTab={setIndex}
        defaultTabIndex={index}
        items={[
          <Typography variant="label" size="large" key={v4()}>
            Overview
          </Typography>,
          <Typography variant="label" size="large" key={v4()}>
            Orders
          </Typography>,
        ]}
      />
      <Box mt="l">
        {index ? (
          <DCAOrderDetailsOrders {...props} />
        ) : (
          <DCAOrderDetailsOverview {...props} />
        )}
      </Box>
    </Box>
  );
};

export default DCAOrderDetailsContent;

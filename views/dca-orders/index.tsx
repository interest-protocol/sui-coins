import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { useDcas } from '@/hooks/use-dca';

import DCAOrderListItem from './dca-order-list-item';
import { DCAOrderListItemProps } from './dca-orders.types';

const DCAOrders: FC = () => {
  const { data: dcas, isLoading } = useDcas();
  const { push, pathname } = useRouter();

  const onChangeTab = (index: number) => {
    push(
      index ? Routes[RoutesEnum.DCAOrders] : Routes[RoutesEnum.DCA],
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout>
      <Box my="3rem" display="flex" justifyContent="center">
        <Tabs
          type="square"
          onChangeTab={onChangeTab}
          defaultTabIndex={Number(Routes[RoutesEnum.DCAOrders] === pathname)}
          items={[
            <Typography variant="label" size="large" as="span" key={v4()}>
              Trade
            </Typography>,
            <Typography variant="label" size="large" as="span" key={v4()}>
              Orders
            </Typography>,
          ]}
        />
      </Box>
      <Box>
        <Box
          p="m"
          pb="2xl"
          alignItems="center"
          justifyItems="center"
          display={['none', 'none', 'none', 'grid']}
          gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
        >
          <Box as="span" />
          <Typography variant="label" size="large">
            Pay with
          </Typography>
          <Typography variant="label" size="large">
            Get
          </Typography>
          <Typography variant="label" size="large">
            Orders
          </Typography>
          <Typography variant="label" size="large">
            Amount
          </Typography>
          <Typography variant="label" size="large">
            Status
          </Typography>
          <Typography variant="label" size="large">
            Actions
          </Typography>
        </Box>
        <Box>
          {!isLoading &&
            dcas?.[0]?.data.map((dca: DCAOrderListItemProps) => (
              <DCAOrderListItem key={v4()} {...dca} />
            ))}
        </Box>
      </Box>
      {!!dcas?.[1]?.data.length && (
        <Box pt="2xl">
          <Typography variant="headline" size="small" my="xl" fontSize="l">
            Previous orders
          </Typography>
          <Box
            p="m"
            pb="2xl"
            alignItems="center"
            justifyItems="center"
            display={['none', 'none', 'none', 'grid']}
            gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
          >
            <Box as="span" />
            <Typography variant="label" size="large">
              Pay with
            </Typography>
            <Typography variant="label" size="large">
              Get
            </Typography>
            <Typography variant="label" size="large">
              Orders
            </Typography>
            <Typography variant="label" size="large">
              Amount
            </Typography>
            <Typography variant="label" size="large">
              Status
            </Typography>
            <Typography variant="label" size="large">
              Actions
            </Typography>
          </Box>
          <Box>
            {!isLoading &&
              dcas?.[1]?.data.map((dca: DCAOrderListItemProps) => (
                <DCAOrderListItem key={v4()} {...dca} />
              ))}
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default DCAOrders;

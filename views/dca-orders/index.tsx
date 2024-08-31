import { Box, Button, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { useDcas } from '@/hooks/use-dca';
import { DCA } from '@/hooks/use-dca/use-dca.types';
import { RefreshSVG } from '@/svg';
import { updateURL } from '@/utils';

import DCAOrderListItem from './dca-order-list-item';
import DCAOrdersEmpty from './dca-orders-empty';
import DCAOrdersError from './dca-orders-error';
import DCAOrdersLoading from './dca-orders-loading';
import DCAOrdersNotConnected from './dca-orders-not-connected';

const DCAOrders: FC = () => {
  const [index, setIndex] = useState(0);
  const { push, pathname, query } = useRouter();
  const currentAccount = useCurrentAccount();
  const { data: dcas, isLoading, mutate } = useDcas();
  const [selectedOrder, setSelectedOrder] = useState<string>(
    query.id as string
  );

  const selectOrder = (id: string) => {
    setSelectedOrder(id === selectedOrder ? '' : id);
    updateURL(id === selectedOrder ? pathname : `${pathname}?id=${id}`);
  };

  const onChangeTab = (index: number) =>
    push(index ? Routes[RoutesEnum.DCAOrders] : Routes[RoutesEnum.DCA]);

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
      <Box
        py="2xl"
        zIndex="0"
        borderRadius="xs"
        position="relative"
        bg="lowestContainer"
        px={['s', 's', '2xl']}
      >
        <Box
          gap="l"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Tabs
            type="square"
            onChangeTab={setIndex}
            defaultTabIndex={index}
            items={[
              <Typography variant="label" size="large" as="span" key={v4()}>
                Active{' '}
                <Typography
                  as="span"
                  key={v4()}
                  size="large"
                  variant="label"
                  display={['none', 'none', 'inline']}
                >
                  orders
                </Typography>
              </Typography>,
              <Typography variant="label" size="large" as="span" key={v4()}>
                Previous{' '}
                <Typography
                  as="span"
                  key={v4()}
                  size="large"
                  variant="label"
                  display={['none', 'none', 'inline']}
                >
                  orders
                </Typography>
              </Typography>,
            ]}
          />
          {index ? (
            <Box gap="xl" display="flex" alignItems="center">
              <Box display="flex" alignItems="center" gap="xs">
                <Box
                  bg="success"
                  width="0.5rem"
                  height="0.5rem"
                  borderRadius="full"
                />
                <Typography variant="body" size="medium">
                  Completed
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="xs">
                <Box
                  bg="error"
                  width="0.5rem"
                  height="0.5rem"
                  borderRadius="full"
                />
                <Typography variant="body" size="medium">
                  Cancelled
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box display="flex" gap="l" justifyContent="flex-end">
              <Box display="flex" alignItems="center" gap="xs">
                <Box
                  bg="primary"
                  width="0.5rem"
                  height="0.5rem"
                  borderRadius="full"
                />
                <Typography variant="body" size="medium">
                  Active
                </Typography>
              </Box>
              <Button
                color="primary"
                variant="outline"
                onClick={() => mutate()}
                disabled={!(dcas && dcas[index] && dcas[index].totalItems)}
                PrefixIcon={
                  <RefreshSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                }
              >
                Refresh
              </Button>
            </Box>
          )}
        </Box>
        <Box
          p="m"
          mt="l"
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
            {index ? 'Date' : 'Actions'}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="l">
          {dcas && dcas[index] ? (
            dcas[index].totalItems ? (
              dcas[index].data.map((dca: DCA) => (
                <DCAOrderListItem
                  key={v4()}
                  {...dca}
                  mutate={mutate}
                  toggleSelectOrder={selectOrder}
                  selected={selectedOrder === dca.id}
                />
              ))
            ) : (
              <DCAOrdersEmpty />
            )
          ) : !currentAccount ? (
            <DCAOrdersNotConnected />
          ) : isLoading ? (
            <DCAOrdersLoading />
          ) : (
            <DCAOrdersError />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default DCAOrders;

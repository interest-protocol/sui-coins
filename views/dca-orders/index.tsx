import { Box, Button, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { RefreshSVG } from '@/svg';

import DCAOrderListItem from './dca-order-list-item';
import { DCAShortInfo } from './dca-orders.types';
import DCAOrdersEmpty from './dca-orders-empty';
import DCAOrdersError from './dca-orders-error';
import DCAOrdersLoading from './dca-orders-loading';
import { useDCAState } from './dca-orders-manager';
import DCAOrdersNotConnected from './dca-orders-not-connected';

const DCAOrders: FC = () => {
  const [index, setIndex] = useState(0);
  const { push, pathname } = useRouter();
  const currentAccount = useCurrentAccount();
  const { activeDcas, inactiveDcas, loading, mutateDCAs } = useDCAState();

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
                onClick={mutateDCAs}
                disabled={!activeDcas.length}
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
          {(index ? inactiveDcas : activeDcas) ? (
            (index ? inactiveDcas : activeDcas).length ? (
              (index ? inactiveDcas : activeDcas).map((dca: DCAShortInfo) => (
                <DCAOrderListItem key={v4()} {...dca} />
              ))
            ) : (
              <DCAOrdersEmpty />
            )
          ) : !currentAccount ? (
            <DCAOrdersNotConnected />
          ) : loading ? (
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

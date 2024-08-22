import {
  Box,
  ProgressIndicator,
  Tabs,
  Typography,
} from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { useDcas } from '@/hooks/use-dca';
import { DCA } from '@/hooks/use-dca/use-dca.types';
import { ErrorSVG, IncineratorNoAssetsSVG } from '@/svg';

import DCAOrderListItem from './dca-order-list-item';

const DCAOrders: FC = () => {
  const currentAccount = useCurrentAccount();
  const { data: dcas, isLoading, mutate } = useDcas();
  const { push, pathname } = useRouter();

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
      {!dcas || (!dcas[0]?.totalItems && !dcas[1]?.totalItems) ? (
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
          <Box
            display="flex"
            borderRadius="s"
            minHeight="25rem"
            alignItems="center"
            bg="lowestContainer"
            justifyContent="center"
          >
            {!dcas ? (
              isLoading ? (
                <ProgressIndicator variant="loading" />
              ) : (
                <Box
                  gap="m"
                  color="error"
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <ErrorSVG maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
                  <Typography variant="label" size="medium">
                    {!currentAccount
                      ? 'You are not connected'
                      : 'Something went wrong'}
                  </Typography>
                </Box>
              )
            ) : !dcas[0]?.totalItems && !dcas[1]?.totalItems ? (
              <Box
                gap="s"
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <IncineratorNoAssetsSVG
                  maxHeight="7.375rem"
                  maxWidth="6.625rem"
                  width="100%"
                />
                <Typography variant="label" size="medium">
                  You don’t have DCAs yet
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : (
        <>
          {!!dcas?.[0]?.data.length && (
            <Box position="relative" zIndex="0">
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
                {dcas[0].data.map((dca: DCA) => (
                  <DCAOrderListItem key={v4()} {...dca} mutate={mutate} />
                ))}
              </Box>
            </Box>
          )}
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
                {dcas[1].data.map((dca: DCA) => (
                  <DCAOrderListItem key={v4()} {...dca} mutate={mutate} />
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default DCAOrders;

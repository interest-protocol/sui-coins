import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { useRecentDcas } from '@/hooks/use-dca';
import { ErrorSVG, IncineratorNoAssetsSVG } from '@/svg';

import DCAOrderListMiniItem from './dca-recent-orders-item';

const DCARecentOrders: FC = () => {
  const currentAccount = useCurrentAccount();
  const { data: dcas, isLoading } = useRecentDcas();

  return (
    <Box
      p="xl"
      display="flex"
      borderRadius="s"
      minHeight="15rem"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="label" size="large">
          Recent DCA
        </Typography>
        <Link href={Routes[RoutesEnum.DCAOrders]}>
          <Typography
            size="medium"
            variant="label"
            color="primary"
            textDecoration="underline"
          >
            View All
          </Typography>
        </Link>
      </Box>
      {isLoading ? (
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ProgressIndicator variant="loading" />
        </Box>
      ) : !dcas ? (
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            gap="m"
            color="error"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <ErrorSVG maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
            <Typography variant="label" size="medium">
              {currentAccount ? 'Something went wrong' : 'Connect your Wallet'}
            </Typography>
          </Box>
        </Box>
      ) : !dcas?.length ? (
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            gap="s"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <IncineratorNoAssetsSVG
              maxHeight="5rem"
              maxWidth="5rem"
              width="100%"
            />
            <Typography variant="label" size="medium">
              You {"don't"} have recent DCAs
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box py="l" display="flex" flexDirection="column" gap="s">
          {dcas.map((dca) => (
            <DCAOrderListMiniItem key={v4()} {...dca} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DCARecentOrders;

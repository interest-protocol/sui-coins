import { Box } from '@interest-protocol/ui-kit';
import { isEmpty } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import { useGetAllCoinsWithMetadata } from './my-coins.hooks';
import MyCoinsHeader from './my-coins-header';
import MyCoinsItem from './my-coins-item';

const MyCoins: FC = () => {
  const { coins, isLoading, error } = useGetAllCoinsWithMetadata();

  return (
    <Layout>
      <Box fontFamily="Proto" fontSize="8xl" textAlign="center" my="l">
        My Coins
      </Box>
      <Box mx="11xl" my="xl" bg="lowestContainer" borderRadius="m">
        <MyCoinsHeader />
        {isLoading && 'fetching'}
        {!isEmpty(error) && JSON.stringify(error)}
        {coins.map((coin) => (
          <MyCoinsItem key={v4()} {...coin} />
        ))}
      </Box>
    </Layout>
  );
};

export default MyCoins;

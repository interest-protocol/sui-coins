import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import { useGetAllCoinsWithMetadata } from './my-coins.hooks';
import MyCoinsHeader from './my-coins-header';
import MyCoinsItem from './my-coins-item';

const MyCoins: FC = () => {
  const { coins, isLoading } = useGetAllCoinsWithMetadata();

  return (
    <Layout>
      <Box
        my="2xl"
        fontFamily="Proto"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        My Coins
      </Box>
      <Box
        my="2xl"
        borderRadius="m"
        mx={[0, '11xl']}
        bg="lowestContainer"
        width={['calc(100vw - 3rem)', 'auto']}
        boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
      >
        <MyCoinsHeader />
        {isLoading ? (
          <Box
            py="m"
            px="l"
            rowGap="m"
            columnGap="xl"
            display="grid"
            cursor="pointer"
            alignItems="center"
            gridTemplateColumns="2rem 1fr 1fr 1fr 2rem"
          >
            <Box />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        ) : (
          coins.map((coin) => <MyCoinsItem key={v4()} {...coin} />)
        )}
      </Box>
    </Layout>
  );
};

export default MyCoins;

import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import WalletConnect from '@/components/wallet';
import { XCirlceSVG } from '@/svg';

import { useGetAllCoinsWithMetadata } from './my-coins.hooks';
import MyCoinsHeader from './my-coins-header';
import MyCoinsItem from './my-coins-item';

const MyCoins: FC = () => {
  const { currentAccount } = useWalletKit();
  const { coins, isLoading, error } = useGetAllCoinsWithMetadata();

  const isError = !currentAccount || error;

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
      {isError ? (
        <Box
          mt="3xl"
          rowGap="xl"
          color="error"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <XCirlceSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
          <Box>
            {!currentAccount
              ? 'You are disconnect, please connect to your wallet.'
              : 'Oops! Something went wrong.'}
          </Box>
          {!currentAccount && <WalletConnect />}
        </Box>
      ) : (
        <Box
          my="2xl"
          borderRadius="m"
          mx={[0, '11xl']}
          overflow="hidden"
          bg="lowestContainer"
          width={['calc(100vw - 3rem)', 'auto']}
          boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
        >
          <MyCoinsHeader />
          {isLoading ? (
            <Box
              rowGap="m"
              columnGap="xl"
              display="grid"
              py={['s', 'm']}
              px={['s', 'l']}
              cursor="pointer"
              alignItems="center"
              borderTop="1px solid"
              borderColor="outlineVariant"
              gridTemplateColumns={[
                '1fr 1fr 1fr 2rem',
                '2rem 1fr 1fr 1fr 2rem',
              ]}
            >
              <Box display={['none', 'block']} />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Box>
          ) : (
            coins.map((coin) => <MyCoinsItem key={v4()} {...coin} />)
          )}
        </Box>
      )}
    </Layout>
  );
};

export default MyCoins;

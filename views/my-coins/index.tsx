import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import ConnectWalletButton from '@/components/wallet/connect-wallet-button';
import { XCirlceSVG } from '@/svg';

import { useGetAllCoinsWithMetadata } from './my-coins.hooks';
import MyCoinsItem from './my-coins-item';
import TableWrapper from './table-wrapper';

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
          <Box textAlign="center">
            {!currentAccount
              ? 'You are disconnect, please connect to your wallet.'
              : 'Oops! Something went wrong.'}
          </Box>
          {!currentAccount && (
            <Box>
              <ConnectWalletButton />
            </Box>
          )}
        </Box>
      ) : (
        <Box my="2xl">
          <TableWrapper
            title="Sui Coins"
            options={['Name', 'Balance', 'Treasury Cap']}
          >
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
                gridTemplateColumns={['1fr 1fr 1fr', '2rem 1fr 1fr 1fr']}
              >
                <Box display={['none', 'block']} />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Box>
            ) : (
              coins.map((coin) => <MyCoinsItem key={v4()} {...coin} />)
            )}
          </TableWrapper>
          <TableWrapper
            title="LPs Coins"
            options={['Name', 'Balance', 'Provider', 'Treasury Cap']}
          />
          <TableWrapper
            title="Official Coins"
            options={['Name', 'Balance', 'Provider', 'Treasury Cap']}
          />
        </Box>
      )}
    </Layout>
  );
};

export default MyCoins;

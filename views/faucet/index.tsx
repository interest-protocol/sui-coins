import { Box, Button, ListItem, Typography } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { useWalletKit } from '@mysten/wallet-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { ETH_CONTROLLER, Network, USDC_CONTROLLER } from '@/constants';
import { ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { PACKAGES } from '@/constants/packages';
import { useMovementClient, useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS, TOKEN_SYMBOL } from '@/lib';
import { ChevronDownSVG } from '@/svg';
import {
  showTXSuccessToast,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { requestMov } from '@/views/faucet/faucet.utils';

const MINT_COINS = [
  {
    symbol: TOKEN_SYMBOL.MOV,
    type: SUI_TYPE_ARG,
  },
  {
    symbol: TOKEN_SYMBOL.ETH,
    type: ETH_TYPE,
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    type: USDC_TYPE,
  },
];

const Pools: FC = () => {
  const [selected, setSelected] = useState(MINT_COINS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = TOKEN_ICONS[MINT_COINS[0].symbol];
  const client = useMovementClient();
  const { account, coinsMap, mutate } = useWeb3();
  const { signTransactionBlock } = useWalletKit();

  const handleMint = async () => {
    try {
      if (!selected) throw new Error('Token not found');
      if (!account) throw new Error('Not account found');

      const transactionBlock = new TransactionBlock();

      if (selected.type === SUI_TYPE_ARG) return requestMov(account);

      const isEth = selected.type === ETH_TYPE;

      const moduleName = selected.type === ETH_TYPE ? 'eth' : 'usdc';

      const minted_coin = transactionBlock.moveCall({
        target: `${PACKAGES.COINS}::${moduleName}::mint`,
        arguments: [
          transactionBlock.object(isEth ? ETH_CONTROLLER : USDC_CONTROLLER),
          transactionBlock.object(SUI_CLOCK_OBJECT_ID),
        ],
      });

      transactionBlock.transferObjects([minted_coin], account);

      const { transactionBlockBytes, signature } = await signTransactionBlock({
        transactionBlock,
      });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: {
          showEffects: true,
          showEvents: false,
          showInput: false,
          showBalanceChanges: false,
          showObjectChanges: false,
        },
      });

      throwTXIfNotSuccessful(tx);
      await showTXSuccessToast(tx, Network.M2);
    } catch (e) {
      console.log(e);
    } finally {
      await mutate();
    }
  };

  const onMint = async () => {
    await toast.promise(handleMint(), {
      loading: 'Loading',
      success: `${selected.symbol} minted successfully`,
      error: 'You can only mint once every 24 hours',
    });
  };

  return (
    <Layout>
      <Typography my="2xl" size="large" variant="display" textAlign="center">
        Faucet
      </Typography>
      <Box
        mb="s"
        mx="auto"
        display="flex"
        borderRadius="2rem"
        bg="lowestContainer"
        flexDirection="column"
        p={['xl', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Typography
          size="large"
          fontSize="5xl"
          variant="title"
          fontWeight="500"
        >
          I would like to mint...
        </Typography>
        <Box my="6xl" display="flex" gap="s" flexDirection="column">
          <Typography variant="body" size="small">
            Choose coin to mint
          </Typography>
          <Box position="relative" display="flex" flexDirection="column">
            <Button
              px="xs"
              variant="outline"
              borderRadius="xs"
              onClick={() => setIsOpen(not)}
              PrefixIcon={
                <Box
                  display="flex"
                  bg="onSurface"
                  color="surface"
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="xs"
                  alignItems="center"
                  justifyContent="center"
                >
                  <SelectedIcon
                    width="100%"
                    maxWidth="1.5rem"
                    maxHeight="1.5rem"
                  />
                </Box>
              }
              SuffixIcon={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  rotate={isOpen ? '180deg' : '0deg'}
                >
                  <ChevronDownSVG
                    width="100%"
                    maxWidth="1rem"
                    maxHeight="1rem"
                  />
                </Box>
              }
            >
              <Typography variant="body" size="large" width="100%">
                {selected.symbol}
              </Typography>
            </Button>
            {isOpen && (
              <Box
                top="4rem"
                zIndex={1}
                cursor="pointer"
                bg="lowContainer"
                borderRadius="xs"
                position="absolute"
                border="2px solid"
                borderColor="outline"
              >
                {MINT_COINS.map(({ symbol, type }) => {
                  const Icon = TOKEN_ICONS[symbol];
                  return (
                    <ListItem
                      key={v4()}
                      title={symbol}
                      onClick={() => {
                        setSelected({ symbol, type });
                        setIsOpen(false);
                      }}
                      PrefixIcon={
                        <Box
                          display="flex"
                          bg="onSurface"
                          color="surface"
                          minWidth="1.5rem"
                          height="1.5rem"
                          borderRadius="xs"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon width="100%" maxWidth="1rem" maxHeight="1rem" />
                        </Box>
                      }
                    />
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="filled"
            onClick={() => {
              onMint();
            }}
          >
            Mint
          </Button>
        </Box>
      </Box>
      <Box
        mb="4xl"
        mx="auto"
        display="flex"
        borderRadius="2rem"
        bg="lowestContainer"
        flexDirection="column"
        p={['xl', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Typography variant="body" size="large">
          Balance minted
        </Typography>
        <Box
          p="m"
          mt="s"
          gap="m"
          bg="surface"
          display="flex"
          borderRadius="s"
          flexDirection="column"
        >
          {MINT_COINS.map(({ symbol, type }) => {
            const Icon = TOKEN_ICONS[symbol];
            return (
              <Box key={v4()} display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap="l">
                  <Box
                    display="flex"
                    bg="onSurface"
                    color="surface"
                    width="2.5rem"
                    height="2.5rem"
                    borderRadius="xs"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
                  </Box>
                  <Typography variant="body" size="large">
                    {symbol}
                  </Typography>
                </Box>
                <Typography variant="body" size="large">
                  {FixedPointMath.toNumber(
                    coinsMap[type]?.totalBalance || ZERO_BIG_NUMBER,
                    coinsMap[type]?.decimals || 0
                  )}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;

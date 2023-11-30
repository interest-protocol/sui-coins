import { Box, Button, ListItem, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { clearTimeout } from 'timers';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { TOKEN_ICONS, TOKEN_SYMBOL } from '@/lib';
import { ChevronDownSVG } from '@/svg';

const Pools: FC = () => {
  const [selected, setSelected] = useState(TOKEN_SYMBOL.MOV);
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = TOKEN_ICONS[selected];

  const mintedCoins = [
    { symbol: TOKEN_SYMBOL.MOV, balance: 1000 },
    { symbol: TOKEN_SYMBOL.USDC, balance: 1000 },
  ];

  const handleMint = () =>
    new Promise((resolve) => {
      const timeout = setTimeout(
        () => {
          console.log('>> selected :: ', selected);
          resolve(undefined);
        },
        3000 * Math.random() + 2000
      );
      clearTimeout(timeout);
    });

  const onMint = () =>
    toast.promise(handleMint(), {
      loading: 'Loading',
      success: `${selected} minted successfully`,
      error: 'Something went wrong',
    });

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
                {selected}
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
                {mintedCoins.map(({ symbol }) => {
                  const Icon = TOKEN_ICONS[symbol];
                  return (
                    <ListItem
                      key={v4()}
                      title={symbol}
                      onClick={() => {
                        setSelected(symbol);
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
          <Button variant="filled" onClick={onMint}>
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
          {mintedCoins.map(({ symbol, balance }) => {
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
                  {balance}
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

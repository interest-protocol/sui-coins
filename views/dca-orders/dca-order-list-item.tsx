import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { AnimatePresence } from 'framer-motion';
import { not } from 'ramda';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import ProgressBar from '@/components/progress-bar';
import { useDcaOrders } from '@/hooks/use-dca';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ChevronDownSVG, ChevronRightSVG, TrashSVG } from '@/svg';
import {
  fetchCoinMetadata,
  isSameStructTag,
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
} from '@/utils';

import DCAOrderDetails from './dca-order-details';
import DCAOrderListItemSkeleton from './dca-order-list-item-skeleton';
import { DCAOrderListItemProps } from './dca-orders.types';

const DCAOrderListItem: FC<DCAOrderListItemProps> = ({
  id,
  min,
  max,
  every,
  input,
  start,
  active,
  mutate,
  output,
  cooldown,
  timeScale,
  lastTrade,
  isTrading,
  inputBalance,
  amountPerTrade,
  remainingOrders,
}) => {
  const coinsType: [string, string] = [input.name, output.name];

  const dcaSdk = useDcaSdk();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const [isOpen, setIsOpen] = useState(false);
  const { data: dcaOrders, isLoading } = useDcaOrders(id, active);
  const [[tokenIn, tokenOut], setCoins] = useState<
    [CoinMetadataWithType | null, CoinMetadataWithType | null]
  >([null, null]);

  const totalOrders =
    remainingOrders + (dcaOrders?.totalItems ?? 0) + (isTrading ? 1 : 0);

  const statusPercentage = dcaOrders
    ? (dcaOrders.data.length * 100) / totalOrders
    : 0;

  const handleDestroyDCA: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    try {
      invariant(currentAccount, 'You must be connected');

      const tx = dcaSdk.stopAndDestroy({
        dca: id,
        coinInType: normalizeStructTag(input.name),
        coinOutType: normalizeStructTag(output.name),
      });

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(txResult);

      showTXSuccessToast(txResult, network, 'DCA destroyed successfully');
    } catch (e) {
      toast.error((e as Error)?.message || 'Error on destroy DCA');
    } finally {
      setTimeout(() => {
        mutate();
      }, 10000);
    }
  };

  useEffect(() => {
    fetchCoinMetadata({
      network,
      types: coinsType.map(normalizeStructTag),
    }).then((data) =>
      setCoins(
        coinsType.map(
          (type) => data.find((item) => isSameStructTag(item.type, type))!
        ) as [CoinMetadataWithType, CoinMetadataWithType]
      )
    );
  }, []);

  if (isLoading || !tokenIn || !tokenOut) return <DCAOrderListItemSkeleton />;

  return (
    <>
      <Box
        overflow="hidden"
        border="1px solid"
        borderRadius="xs"
        borderColor="outlineVariant"
        display={['none', 'none', 'none', 'block']}
      >
        <Box
          p="m"
          zIndex="1"
          key={v4()}
          display="grid"
          borderRadius="xs"
          alignItems="center"
          position="relative"
          bg="lowestContainer"
          justifyItems="center"
          onClick={() => setIsOpen(not)}
          gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
        >
          <Motion
            style={{ originX: 0.5, originY: 0.5 }}
            initial={{ rotate: isOpen ? '0deg' : '90deg' }}
            animate={{ rotate: isOpen ? '90deg' : '0deg' }}
          >
            <ChevronRightSVG
              width="100%"
              maxWidth="1.25rem"
              maxHeight="1.25rem"
            />
          </Motion>
          <Box gap="xs" display="flex" alignItems="center">
            <TokenIcon
              withBg
              rounded
              size="1rem"
              network={network}
              type={tokenIn?.type ?? ''}
              symbol={tokenIn?.symbol ?? ''}
            />
            <Typography variant="body" size="medium" color="outline">
              {tokenIn?.symbol ?? ''}
            </Typography>
          </Box>
          <Box gap="xs" display="flex" alignItems="center">
            <TokenIcon
              withBg
              rounded
              size="1rem"
              network={network}
              type={tokenOut?.type ?? ''}
              symbol={tokenOut?.symbol ?? ''}
            />
            <Typography variant="body" size="medium" color="outline">
              {tokenOut?.symbol ?? ''}
            </Typography>
          </Box>
          <Typography variant="body" size="large">
            {totalOrders}
          </Typography>
          <Typography variant="body" size="large">
            {FixedPointMath.toNumber(
              BigNumber(inputBalance),
              tokenIn?.decimals ?? 0
            )}{' '}
            {tokenIn?.symbol ?? ''}
          </Typography>
          <Box
            px="l"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box
              px="l"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <ProgressBar
                value={statusPercentage}
                color={
                  active ? 'primary' : remainingOrders ? 'error' : 'success'
                }
              />
            </Box>
          </Box>
          <Box>
            {active ? (
              <Button variant="text" isIcon onClick={handleDestroyDCA}>
                <TrashSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            ) : (
              <Typography variant="body" size="medium">
                {new Date(start * 1000).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
        <AnimatePresence>
          <DCAOrderDetails
            min={min}
            max={max}
            start={start}
            every={every}
            active={active}
            isOpen={isOpen}
            cooldown={cooldown}
            lastTrade={lastTrade}
            timeScale={timeScale}
            totalOrders={totalOrders}
            coins={[tokenIn, tokenOut]}
            orders={dcaOrders?.data ?? []}
            amountPerTrade={amountPerTrade}
          />
        </AnimatePresence>
      </Box>
      <Box
        mt="-1rem"
        overflow="hidden"
        display={['block', 'block', 'block', 'none']}
      >
        <Box
          py="xl"
          px="xs"
          gap="s"
          zIndex="1"
          key={v4()}
          display="flex"
          borderRadius="xs"
          position="relative"
          alignItems="stretch"
          bg="lowestContainer"
          flexDirection="column"
          onClick={() => setIsOpen(not)}
        >
          <Box
            p="m"
            display="grid"
            borderRadius="s"
            border="1px solid"
            alignItems="stretch"
            justifyItems="center"
            borderColor="outlineVariant"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Pay with
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <TokenIcon
                  withBg
                  rounded
                  size="1.1rem"
                  network={network}
                  type={tokenIn?.type ?? ''}
                  symbol={tokenIn?.symbol ?? ''}
                />
                <Typography variant="body" size="medium">
                  {tokenIn?.symbol ?? ''}
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Get
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <TokenIcon
                  withBg
                  rounded
                  size="1.1rem"
                  network={network}
                  type={tokenOut?.type ?? ''}
                  symbol={tokenOut?.symbol ?? ''}
                />
                <Typography variant="body" size="medium">
                  {tokenOut?.symbol ?? ''}
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Orders
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <Typography variant="body" size="medium">
                  {totalOrders}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            p="m"
            display="grid"
            borderRadius="s"
            border="1px solid"
            alignItems="stretch"
            justifyItems="center"
            borderColor="outlineVariant"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Amount
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap="xs"
              >
                <Typography variant="body" size="medium">
                  {FixedPointMath.toNumber(
                    BigNumber(inputBalance),
                    tokenIn?.decimals ?? 0
                  )}{' '}
                  {tokenIn?.symbol ?? ''}
                </Typography>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Status
              </Typography>
              <Box
                px="l"
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box
                  px="l"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <ProgressBar
                    value={statusPercentage}
                    color={
                      active ? 'primary' : remainingOrders ? 'error' : 'success'
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box
              gap="m"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="label" size="large">
                Actions
              </Typography>
              {active ? (
                <Button variant="text" isIcon onClick={handleDestroyDCA}>
                  <TrashSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
                </Button>
              ) : (
                <Typography variant="body" size="small">
                  {new Date(start * 1000).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            gap="xl"
            variant="filled"
            justifyContent="center"
            SuffixIcon={
              <Motion
                width="1.25rem"
                height="1.25rem"
                style={{ originX: 0.5, originY: 0.5 }}
                initial={{ rotate: isOpen ? '0deg' : '180deg' }}
                animate={{ rotate: isOpen ? '180deg' : '0deg' }}
              >
                <ChevronDownSVG
                  width="100%"
                  maxWidth="1.25rem"
                  maxHeight="1.25rem"
                />
              </Motion>
            }
          >
            Expand
          </Button>
        </Box>
        <DCAOrderDetails
          min={min}
          max={max}
          every={every}
          start={start}
          isOpen={isOpen}
          active={active}
          cooldown={cooldown}
          lastTrade={lastTrade}
          timeScale={timeScale}
          totalOrders={totalOrders}
          coins={[tokenIn, tokenOut]}
          orders={dcaOrders?.data ?? []}
          amountPerTrade={amountPerTrade}
        />
      </Box>
    </>
  );
};

export default DCAOrderListItem;

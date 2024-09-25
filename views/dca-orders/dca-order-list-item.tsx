import {
  Box,
  Button,
  Dialog,
  Motion,
  Typography,
} from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import invariant from 'tiny-invariant';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import ProgressBar from '@/components/progress-bar';
import { EXPLORER_URL } from '@/constants';
import { SENTINEL_API_URI } from '@/constants/dca';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useDialog } from '@/hooks/use-dialog';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { ChevronDownSVG, ChevronRightSVG, LinkSVG, TrashSVG } from '@/svg';
import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  updateURL,
} from '@/utils';

import DCAOrderDetails from './dca-order-details';
import DCAOrderListItemSkeleton from './dca-order-list-item-skeleton';
import { DCAOrdersMessagesEnum } from './dca-orders.data';
import { DCAShortInfo } from './dca-orders.types';
import { useDCAState } from './dca-orders-manager';

const DCAOrderListItem: FC<DCAShortInfo> = ({
  id,
  start,
  input,
  output,
  active,
  totalOrders,
  inputBalance,
  remainingOrders,
}) => {
  const dcaSdk = useDcaSdk();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const { pathname } = useRouter();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { dialog, handleClose: handleCloseDialog } = useDialog();
  const { setModal, handleClose } = useModal();

  const { selectedId, selectId, coinsMetadata, mutateDCAs } = useDCAState();

  const selected = useMemo(() => selectedId === id, [selectedId]);

  const handleToggleDetails = () => {
    selectId(id);
    updateURL(selected ? pathname : `${pathname}?id=${id}`);
  };

  const tokenIn = coinsMetadata[input];
  const tokenOut = coinsMetadata[output];

  const statusPercentage =
    ((totalOrders - remainingOrders) * 100) / totalOrders;

  const onDestroyDca = async () => {
    try {
      invariant(currentAccount, 'You must be connected');

      const tx = dcaSdk.stopAndDestroy({
        dca: id,
        coinInType: normalizeStructTag(input),
        coinOutType: normalizeStructTag(output),
      });

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(txResult);

      await fetch(`${SENTINEL_API_URI[network]}dcas/${id}`, {
        method: 'DELETE',
      });

      showTXSuccessToast(txResult, network, 'DCA destroyed successfully');
    } finally {
      mutateDCAs();
    }
  };

  const destroyDca = () => {
    dialog.promise(onDestroyDca(), {
      loading: () => ({
        title: 'Destroying DCA...',
        message: DCAOrdersMessagesEnum.destroyingDCA,
      }),
      error: () => ({
        title: 'DCA Failure',
        message: DCAOrdersMessagesEnum.destroyingFailure,
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'DCA Successfully',
        message: DCAOrdersMessagesEnum.destroyingSuccess,
        primaryButton: {
          label: 'Got it',
          onClick: handleCloseDialog,
        },
      }),
    });
  };

  const handleDestroyDCA = () => {
    setModal(
      <Dialog
        status="warning"
        title="Confirmation"
        message="Are you sure you want to destroy the DCA?"
        primaryButton={
          <Button
            bg="#D87706"
            width="60%"
            display="flex"
            variant="filled"
            nHover={{
              background: 'linear-gradient(0deg, #FFF2, #FFF2),#D87706',
            }}
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              handleClose();
              destroyDca();
            }}
          >
            Destroy
          </Button>
        }
        secondaryButton={
          <Button
            mr="s"
            width="30%"
            borderColor="#C6C6CA"
            nHover={{
              color: '#D87706',
              borderColor: '#D87706',
              background: '#d877061c',
            }}
            display="flex"
            variant="outline"
            alignItems="center"
            justifyContent="center"
            onClick={handleClose}
          >
            Cancel
          </Button>
        }
      />
    );
  };
  if (!tokenIn || !tokenOut) return <DCAOrderListItemSkeleton />;

  return (
    <AnimatePresence>
      <Box
        overflow="hidden"
        border="1px solid"
        borderRadius="xs"
        borderColor="outlineVariant"
        display={['none', 'none', 'none', 'block']}
      >
        <Box
          px="m"
          py="xl"
          zIndex="1"
          key={v4()}
          display="grid"
          borderRadius="xs"
          alignItems="center"
          position="relative"
          bg="lowestContainer"
          justifyItems="center"
          onClick={handleToggleDetails}
          gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
        >
          <Box transform={`rotate(${selected ? '90deg' : '0deg'})`}>
            <ChevronRightSVG
              width="100%"
              maxWidth="1.25rem"
              maxHeight="1.25rem"
            />
          </Box>
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
          <Box
            gap="xs"
            display="flex"
            justifyContent="flex-end"
            onClick={(e) => e.stopPropagation()}
          >
            {active ? (
              <>
                <Button
                  isIcon
                  color="error"
                  variant="text"
                  onClick={handleDestroyDCA}
                >
                  <TrashSVG
                    width="100%"
                    maxWidth="1.25rem"
                    maxHeight="1.25rem"
                  />
                </Button>
                <Link
                  target="_blank"
                  href={`${EXPLORER_URL[network]}/object/${id}`}
                >
                  <Button
                    isIcon
                    variant="text"
                    color="primary"
                    justifySelf="self-end"
                  >
                    <LinkSVG
                      width="100%"
                      maxWidth="1.25rem"
                      maxHeight="1.25rem"
                    />
                  </Button>
                </Link>
              </>
            ) : (
              <Typography variant="body" size="medium">
                {new Date(start * 1000).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
        <AnimatePresence>
          <DCAOrderDetails id={id} />
        </AnimatePresence>
      </Box>
      <Box overflow="hidden" display={['block', 'block', 'block', 'none']}>
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
          onClick={handleToggleDetails}
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
                mt="s"
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
                <Box display="flex" gap="xs" justifyContent="flex-end">
                  <Button
                    isIcon
                    color="error"
                    variant="text"
                    onClick={handleDestroyDCA}
                  >
                    <TrashSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
                  </Button>
                  <Link href={`${EXPLORER_URL[network]}/object/${id}`}>
                    <Button
                      isIcon
                      variant="text"
                      color="primary"
                      justifySelf="self-end"
                    >
                      <LinkSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
                    </Button>
                  </Link>
                </Box>
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
                initial={{ rotate: selected ? '0deg' : '180deg' }}
                animate={{ rotate: selected ? '180deg' : '0deg' }}
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
        <DCAOrderDetails id={id} />
      </Box>
    </AnimatePresence>
  );
};

export default DCAOrderListItem;

import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { formatAddress } from '@mysten/sui.js/utils';
import { toPairs } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { CopySVG, DotErrorSVG, PlusSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { getAmountsMapFromObjects } from '@/views/components/send-asset-details/send-asset-details.utils';

import { IncineratorForm } from '../incinerator.types';
import { useBurn } from './incinerator-button.hooks';
import { IncineratorButtonProps } from './incinerator-button.types';

const IncineratorButton: FC<IncineratorButtonProps> = ({ openModal }) => {
  const burn = useBurn();
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const { setModal, handleClose } = useModal();
  const { control, reset } = useFormContext<IncineratorForm>();
  const objects = useWatch({ control, name: 'objects' });

  const copy = (type: string) => {
    navigator.clipboard.writeText(type);

    toast('Link copied to clipboard');
  };

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network);
    reset();
  };

  const amountList = toPairs(getAmountsMapFromObjects(objects))
    .map(([type, amount]) => ({
      symbol: coinsMap[type].symbol,
      isGreater: coinsMap[type].balance.isLessThan(amount),
    }))
    .filter((item) => item.isGreater);

  const handleBurn = async () => {
    if (
      !objects ||
      !objects.length ||
      !objects.every(({ value }) => Number(value))
    )
      return;

    const toasterId = toast.loading(
      `Burning asset${objects.length === 1 ? '' : 's'}...`
    );

    try {
      await burn(objects, onSuccess);
      toast.success(
        `Asset${objects.length === 1 ? '' : 's'} burned successfully`
      );
    } catch (e) {
      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      toast.dismiss(toasterId);
    }
  };

  const onBurn = () =>
    setModal(
      <Box
        p="l"
        gap="xl"
        display="flex"
        borderRadius="m"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Typography variant="title" size="large" textAlign="center">
          Caution
        </Typography>
        <Box>
          <Typography variant="body" size="medium" maxWidth="27rem">
            You cannot revert, once assets are burnt. Make sure, the addresses
            that you are trying to burn are:
          </Typography>
          <Box display="flex" flexDirection="column" gap="xs" my="l">
            {objects.map(({ type }) => (
              <Box
                p="xs"
                key={v4()}
                display="flex"
                cursor="pointer"
                bg="lowContainer"
                borderRadius="xs"
                alignItems="center"
                onClick={() => copy(type)}
                nHover={{ bg: 'container' }}
                justifyContent="space-between"
              >
                <Typography size="medium" variant="label">
                  {formatAddress(type)}
                </Typography>
                <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              </Box>
            ))}
          </Box>
        </Box>
        <Box display="flex" gap="s" justifyContent="center">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            justifyContent="center"
            onClick={() => {
              handleClose();
              handleBurn();
            }}
          >
            Continue anyway
          </Button>
        </Box>
      </Box>
    );

  return (
    <>
      {amountList?.length ? (
        <Box
          p="s"
          gap="s"
          display="flex"
          borderRadius="xs"
          border="1px solid"
          bg="errorContainer"
          color="onErrorContainer"
          borderColor="onErrorContainer"
        >
          {amountList?.map((item) => (
            <>
              <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              <Typography variant="label" size="medium">
                {`You don't have ${item.symbol} enough to burn`}
              </Typography>
            </>
          ))}
        </Box>
      ) : null}
      <Box display="flex" justifyContent="center" gap="xs">
        <Button
          variant="outline"
          onClick={openModal}
          borderColor="outlineVariant"
          SuffixIcon={
            <PlusSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
          }
        >
          Add more
        </Button>
        <Button
          variant="filled"
          onClick={onBurn}
          disabled={
            !objects ||
            !objects.length ||
            !objects.every(({ value }) => Number(value)) ||
            !amountList ||
            Boolean(amountList.length)
          }
        >
          Burn Object{objects.length === 1 ? '' : 's'}
        </Button>
      </Box>
    </>
  );
};

export default IncineratorButton;

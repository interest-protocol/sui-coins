import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { prop, toPairs } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { CopySVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { getAmountsMapFromObjects } from '@/views/components/send-asset-details/send-asset-details.utils';

import IncineratorTokenObject from '../component/incinerator-token-object';
import { IncineratorForm } from '../incinerator.types';
import { useBurn } from './incinerator-button.hooks';

const IncineratorButton: FC = () => {
  const burn = useBurn();
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const { setModal, handleClose } = useModal();
  const { control, reset } = useFormContext<IncineratorForm>();
  const allObjects = useWatch({ control, name: 'objects' });

  const objects = allObjects.filter(prop('active'));

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
      symbol: coinsMap[type]?.symbol,
      isGreater: coinsMap[type].balance.isLessThan(amount),
    }))
    .filter((item) => item.isGreater);

  const disabled =
    !objects ||
    !objects.length ||
    !objects.every(({ value }) => Number(value)) ||
    !amountList ||
    Boolean(amountList.length);

  const handleBurn = async () => {
    if (disabled) return;

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
        py="l"
        px="xl"
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
            {objects.map((object) => (
              <Box
                p="xs"
                key={v4()}
                display="flex"
                cursor="pointer"
                bg="lowContainer"
                borderRadius="xs"
                alignItems="center"
                nHover={{ bg: 'container' }}
                justifyContent="space-between"
                onClick={() => copy(object.type)}
              >
                <IncineratorTokenObject object={object} />
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
    <Button mx="auto" variant="filled" onClick={onBurn} disabled={disabled}>
      Burn {objects.length} Asset{objects.length === 1 ? '' : 's'}
    </Button>
  );
};

export default IncineratorButton;

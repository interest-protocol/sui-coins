import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { formatAddress } from '@mysten/sui.js/utils';
import { prop } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { CopySVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';

import { useBurn } from '../incinerator.hooks';
import { IncineratorForm } from '../incinerator.types';
import IncineratorTokenObject from '../incinerator-token-object';

const IncineratorButton: FC = () => {
  const burn = useBurn();
  const { network } = useSuiClientContext();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<IncineratorForm>();
  const allObjects = useWatch({ control, name: 'objects' });

  const objects = allObjects.filter(prop('active'));

  const copy = (type: string) => {
    navigator.clipboard.writeText(type);

    toast('Link copied to clipboard');
  };

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network as Network);
  };

  const disabled = !objects || !objects.length;

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
      setValue('reset', true);
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
            This is irreversible. Please double-check the types of assets you
            are burning.
          </Typography>
          <Box
            my="l"
            gap="xs"
            display="flex"
            overflowY="auto"
            maxHeight="20rem"
            flexDirection="column"
          >
            {objects.map((object) => (
              <Box
                p="xs"
                key={v4()}
                display="flex"
                bg="lowContainer"
                borderRadius="xs"
                alignItems="center"
                nHover={{ bg: 'container' }}
                justifyContent="space-between"
              >
                <IncineratorTokenObject object={object} />
                <Box textAlign="right">
                  <Typography size="medium" variant="body">
                    {object.value}
                  </Typography>
                  <Typography
                    mt="xs"
                    size="small"
                    variant="body"
                    color="outline"
                    cursor="pointer"
                    onClick={() => copy(object.type)}
                    nHover={{ color: 'outlineVariant' }}
                  >
                    {formatAddress(object.type)}{' '}
                    <CopySVG
                      width="100%"
                      maxWidth="0.75rem"
                      maxHeight="0.75rem"
                    />
                  </Typography>
                </Box>
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

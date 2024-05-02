import {
  Box,
  Button,
  Dialog,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { IncineratorNoAssetsSVG } from '@/svg';

import { IncineratorForm } from '../incinerator.types';

const IncineratorBurnButton: FC = () => {
  const { setModal, handleClose } = useModal();
  const { isFetchingCoinBalances } = useWeb3();

  const { control } = useFormContext<IncineratorForm>();
  const fields = useWatch({ control, name: `objects` });

  const handleBurnAssets = () => {
    setModal(
      <Dialog
        title="Warning message"
        status="error"
        message="This is the warning description. It can be anything you want and as long as you want. But please don't make it too long."
        primaryButton={{
          label: 'Burn Assets',
          onClick: () => {
            handleClose();
          },
        }}
        secondaryButton={{
          label: 'Close',
          onClick: handleClose,
        }}
      />
    );
  };

  return !isFetchingCoinBalances ? (
    !fields?.length ? (
      <Box
        gap="s"
        display="flex"
        height="50vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box p="m">
          <IncineratorNoAssetsSVG
            maxHeight="7.375rem"
            maxWidth="6.625rem"
            width="100%"
          />
        </Box>
        <Typography variant="label" size="medium">
          You don’t have any assets
        </Typography>
      </Box>
    ) : (
      <Box py="m" display="flex" justifyContent="center">
        <Button
          type="button"
          variant="filled"
          borderRadius="xs"
          onClick={handleBurnAssets}
        >
          Burn assets
        </Button>
      </Box>
    )
  ) : (
    <Box mx="auto" display="flex" alignItems="center" flexDirection="column">
      <ProgressIndicator size={40} variant="loading" />
    </Box>
  );
};

export default IncineratorBurnButton;

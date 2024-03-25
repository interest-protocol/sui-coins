import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';
import { useModal } from '@/hooks/use-modal';
import { ChevronRightSVG } from '@/svg';
import SelectObjectModal from '@/views/components/select-object-modal';

import { ZkSendForm } from '../zksend.types';

const ZkSendSelectObject: FC = () => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<ZkSendForm>();
  const token = useWatch({ control, name: 'object' });

  const onSelect = (object: CoinObject | ObjectData) => {
    setValue('object', object);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectObjectModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        custom: true,
        allowClose: true,
      }
    );

  return (
    <Box
      p="xs"
      gap="xs"
      display="flex"
      minWidth="8rem"
      cursor="pointer"
      borderRadius="xs"
      border="1px solid"
      alignItems="center"
      onClick={openModal}
      borderColor="outlineVariant"
    >
      {token && (
        <TokenIcon
          withBg
          type={token.type}
          network={network}
          symbol={token.symbol}
        />
      )}
      <Typography variant="label" size="large" flex="1" as="span">
        {token ? token.symbol : '---'}
      </Typography>
      <Box rotate="90deg">
        <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
    </Box>
  );
};

export default ZkSendSelectObject;

import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ObjectData } from '../../../../resui/web3-manager/all-objects-manager/all-objects.types';
import { useModal } from '@/hooks/use-modal';
import { MinusSVG, PlusSVG } from '@/svg';
import SelectObjectModal from '@/views/components/select-object-modal';

import { CoinObject } from '../../../../resui/web3-manager/coins-manager/coins-manager.types';
import SendFormSelectObject from './send-select-object';
import { ISendTransferForm } from './send-transfer.types';
import FormSendButton from './send-transfer-button';

const SendTransferFormFields = () => {
  const { setModal, handleClose } = useModal();
  const {
    control,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<ISendTransferForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'objects',
  });

  const onSelect = async (object: ObjectData) => {
    const balance = (object.display as CoinObject)?.balance;
    const editable = balance && !balance.isZero();

    append({
      ...object,
      editable,
      value: !editable && !balance ? '1' : '',
    });
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectObjectModal
          noCoins
          onSelect={onSelect}
          closeModal={handleClose}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <>
      <Box display="flex" flexDirection="column" gap="xs">
        <Box>1. Wallet Address</Box>
        <TextField
          nPlaceholder={{ opacity: 0.7 }}
          status={errors.address && 'error'}
          fieldProps={{ borderRadius: 'xs' }}
          supportingText={errors.address?.message}
          placeholder="@suicoins or 0x0123456789abcdef..."
          {...register('address', { onBlur: () => clearErrors('address') })}
        />
        <Box mt="l">2. Assets</Box>
        {fields.map(({ id }, index) => (
          <Box key={id} display="flex" gap="s">
            <SendFormSelectObject index={index} />
            <Button
              isIcon
              variant="tonal"
              bg="lowContainer"
              borderRadius="50%"
              mt={['3xl', '2xs']}
              onClick={() => remove(index)}
            >
              <MinusSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            </Button>
          </Box>
        ))}
      </Box>
      {fields.length ? (
        <FormSendButton openModal={openModal} />
      ) : (
        <Box
          p="xl"
          gap="xl"
          display="flex"
          cursor="pointer"
          borderRadius="s"
          border="1px solid"
          onClick={openModal}
          justifyContent="center"
          borderColor="outlineVariant"
        >
          <Box
            bg="primary"
            width="2rem"
            height="2rem"
            display="flex"
            color="onPrimary"
            alignItems="center"
            borderRadius="full"
            justifyContent="center"
          >
            <PlusSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
          </Box>
          <Typography variant="title" size="large">
            Add NFT, or other objects
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SendTransferFormFields;

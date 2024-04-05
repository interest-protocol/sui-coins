import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ObjectData } from '@/context/all-objects/all-objects.types';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { MinusSVG, PlusSVG } from '@/svg';
import SelectObjectModal from '@/views/components/select-object-modal';

import SendFormSelectObject from './send-select-object';
import { ISendSimpleForm } from './send-simple.types';
import SendButton from './send-simple-button';

const SendSimpleFormFields = () => {
  const { coinsMap } = useWeb3();
  const { setModal, handleClose } = useModal();
  const { control } = useFormContext<ISendSimpleForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'objects',
  });

  const onSelect = async (object: ObjectData) => {
    const balance = coinsMap[(object.display as CoinObject)?.type].balance;
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
        <SelectObjectModal closeModal={handleClose} onSelect={onSelect} />
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
          <SendButton />
        </Box>
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
            Add Coin, NFT, or other
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SendSimpleFormFields;

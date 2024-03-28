import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';
import { useModal } from '@/hooks/use-modal';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import SelectObjectModal from '@/views/components/select-object-modal';

import { ZkSendForm } from '../send.types';

const SelectObject: FC = () => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<ZkSendForm>();

  const object = useWatch({
    control,
    name: 'object',
  });

  const { type } = object ?? {
    type: undefined,
  };

  const onSelect = async (object: ObjectData) => {
    const balance = (object.display as CoinObject)?.balance;
    const editable = balance && !balance.isZero();

    setValue('object', {
      ...object,
      editable,
      value: !editable && !balance ? '1' : '0',
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

  const displayName = object?.display
    ? (object.display as Record<string, string>).name ??
      object.display.symbol ??
      type
    : type;

  const { symbol, type: coinType } = (object?.display as CoinObject) ?? {
    type,
    symbol: '',
  };

  const url = (object?.display as Record<string, string>)?.image_url || '';

  return (
    <Box position="relative">
      <Button
        p="2xs"
        ml="-0.7rem"
        fontSize="s"
        width="100%"
        variant="tonal"
        borderRadius="xs"
        onClick={openModal}
        bg="highestContainer"
        {...(type && {
          PrefixIcon: (
            <TokenIcon
              withBg
              symbol={symbol}
              {...(url ? { url } : { network, type: coinType })}
            />
          ),
        })}
      >
        <Typography
          m="xs"
          size="large"
          variant="label"
          pr={['0', 'xs']}
          overflow="hidden"
          whiteSpace="nowrap"
          width={['0px', 'auto']}
          display={[type ? 'none' : 'block', 'block']}
        >
          {symbol ||
            (type && type === displayName
              ? formatAddress(type)
              : displayName) ||
            'Select Token'}
        </Typography>
        {type ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectObject;

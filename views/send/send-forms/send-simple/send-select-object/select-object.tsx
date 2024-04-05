import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { ObjectData } from '@/context/all-objects/all-objects.types';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import SelectObjectModal from '@/views/components/select-object-modal';

import { ISendSimpleForm } from '../send-simple.types';
import { SendFormSelectObjectProps } from './send-select-object.types';

const SelectObject: FC<SendFormSelectObjectProps> = ({ index }) => {
  const network = useNetwork();

  const { setValue, control } = useFormContext<ISendSimpleForm>();

  const object = useWatch({
    control,
    name: `objects.${index}`,
  });

  const { type } = object ?? {
    type: undefined,
  };

  const { setModal, handleClose } = useModal();

  const onSelect = async (object: ObjectData) => {
    const balance = (object.display as CoinObject)?.balance;
    const editable = balance && !balance.isZero();

    setValue(`objects.${index}`, {
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

  const displayName = object?.display
    ? (object.display as Record<string, string>).name ??
      object.display.symbol ??
      type
    : type;

  const url = (object?.display as Record<string, string>)?.image_url || '';

  const { symbol, type: coinType } = (object?.display as CoinObject) ?? {
    type,
    symbol: '',
  };

  return (
    <Box position="relative">
      <Button
        px="xs"
        py="2xs"
        ml="-0.7rem"
        width="100%"
        fontSize="s"
        height="2rem"
        variant="tonal"
        bg="lowContainer"
        borderRadius="xs"
        onClick={openModal}
        {...(type && {
          PrefixIcon: (
            <TokenIcon
              withBg
              size="1rem"
              symbol={symbol}
              {...(url ? { url } : { network, type: coinType })}
            />
          ),
        })}
      >
        <Typography
          size="large"
          variant="label"
          pr={['0', 'xs']}
          overflow="hidden"
          whiteSpace="nowrap"
          width={['0px', 'auto']}
          display={[type ? 'none' : 'block', 'block']}
        >
          {symbol ||
            (type && type === displayName ? formatAddress(type) : displayName)}
        </Typography>
      </Button>
    </Box>
  );
};

export default SelectObject;

import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CoinObject } from '../../../../../components/web3-manager/coins-manager/coins-manager.types';
import { ISendBulkForm } from '../send-bulk.types';

const SelectObject: FC = () => {
  const { network } = useSuiClientContext();

  const { setValue, control } = useFormContext<ISendBulkForm>();

  const object = useWatch({
    control,
    name: 'object',
  });

  const { type } = object ?? {
    type: undefined,
  };

  const { setModal, handleClose } = useModal();

  const onSelect = async (object: CoinObject) =>
    setValue('object', {
      ...object,
      value: '',
    });

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal simple closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  const displayName = object ? (object.symbol ?? type) : type;

  const { symbol, type: coinType } = object ?? {
    type,
    symbol: '',
  };

  return (
    <Box position="relative">
      <Button
        px="s"
        py="2xs"
        gap="2xs"
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
              type={coinType}
              symbol={symbol}
              network={network as Network}
            />
          ),
        })}
      >
        <Typography
          size="large"
          variant="label"
          maxWidth="12ch"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          width={['0px', 'auto']}
          display={[type ? 'none' : 'block', 'block']}
        >
          {(symbol ||
            (type && type === displayName
              ? formatAddress(type)
              : displayName)) ??
            'Select Token'}
        </Typography>
        {symbol ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectObject;

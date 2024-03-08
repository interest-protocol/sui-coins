import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { CoinData } from '@/interface';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import { updateURL } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const { network } = useNetwork();
  const { pathname } = useRouter();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const Icon = TOKEN_ICONS[network][currentSymbol];

  const changeURL = (type: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(label, type);

    updateURL(
      `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
        'to'
      )}`
    );
  };

  const oppositeType = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}.type`,
  });

  const onSelect = async ({ type, decimals, symbol }: CoinData) => {
    if (type === oppositeType)
      setValue(label === 'to' ? 'from' : 'to', currentToken);

    setValue(label, {
      type,
      symbol,
      decimals,
      value: '',
      locked: false,
    });
    setValue(`${label === 'from' ? 'to' : 'from'}.value`, '');

    changeURL(type);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box
      position="relative"
      minWidth={['8rem', '8rem', '8rem', '8rem', '10rem']}
    >
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        color="onSurface"
        borderRadius="xs"
        bg="highestContainer"
        onClick={openModal}
        {...(Icon && {
          PrefixIcon: (
            <Box
              as="span"
              width="2.5rem"
              height="2.5rem"
              bg="onSurface"
              color="onPrimary"
              borderRadius="xs"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TokenIcon network={network} tokenId={currentSymbol} />
            </Box>
          ),
        })}
      >
        <Typography size="large" variant="label" p="xs">
          {currentSymbol ?? 'Select Token'}
        </Typography>
        {currentSymbol ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;

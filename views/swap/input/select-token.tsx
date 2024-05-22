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
  const network = useNetwork();
  const { pathname } = useRouter();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
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
      usdPrice: currentToken.usdPrice,
    });

    fetch(`/api/auth/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) =>
        setValue(`${label}.usdPrice`, data[symbol][0].quote.USD.price)
      )
      .catch(() => null);
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
      minWidth={['4rem', '8rem', '8rem', '8rem', '6.25rem']}
    >
      <Button
        p="xs"
        pl={currentType ? 'xs' : '1rem !important'}
        width="100%"
        fontSize="xs"
        variant="tonal"
        height="2.5rem"
        borderRadius="full"
        color="onSurface"
        border="1px solid"
        borderColor="outline"
        bg="highestContainer"
        onClick={openModal}
        {...(Icon && {
          PrefixIcon: (
            <Box
              as="span"
              width="2rem"
              height="2rem"
              bg="onSurface"
              display="flex"
              borderRadius="m"
              color="onPrimary"
              alignItems="center"
              justifyContent="center"
            >
              <TokenIcon
                network={network}
                symbol={currentSymbol}
                type={currentToken.type}
              />
            </Box>
          ),
        })}
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            size="large"
            variant="label"
            overflow="hidden"
            whiteSpace="nowrap"
            fontFamily="Satoshi"
            width={['0px', 'auto']}
            display={[currentType ? 'none' : 'block', 'block']}
          >
            {currentSymbol ?? 'Select Token'}
          </Typography>
          {currentSymbol ? (
            <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          ) : (
            <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          )}
        </Box>
      </Button>
    </Box>
  );
};

export default SelectToken;

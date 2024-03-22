import { Token } from '@interest-protocol/sui-tokens';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
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

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const changeURL = (type: string, oppositeType?: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(label, type);

    if (oppositeType)
      searchParams.set(label === 'to' ? 'from' : 'to', oppositeType);

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

  const onSelect = async ({ type, decimals, symbol, chain }: Token) => {
    if (type === oppositeType) {
      setValue(label === 'to' ? 'from' : 'to', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        usdPrice: currentToken.usdPrice,
        chain: currentToken.chain,
        display: '',
      });
    }

    setValue(label, {
      type,
      chain,
      symbol,
      decimals,
      display: '',
      usdPrice: null,
    });

    fetch(`/api/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) =>
        setValue(`${label}.usdPrice`, data[symbol][0].quote.USD.price)
      )
      .catch(() => null);

    setValue(`${label === 'from' ? 'to' : 'from'}.display`, '');

    changeURL(type, type === oppositeType ? currentToken.type : undefined);
  };

  const openModal = () =>
    !swapping &&
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
      minWidth={['4rem', '8rem', '8rem', '8rem', '10rem']}
    >
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        borderRadius="xs"
        disabled={swapping}
        onClick={openModal}
        bg="highestContainer"
        opacity={swapping ? 0.7 : 1}
        {...(currentType && {
          PrefixIcon: (
            <TokenIcon
              withBg
              network={network}
              type={currentType}
              symbol={currentSymbol}
            />
          ),
        })}
      >
        <Typography
          m="xs"
          size="large"
          variant="label"
          overflow="hidden"
          whiteSpace="nowrap"
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
      </Button>
    </Box>
  );
};

export default SelectToken;

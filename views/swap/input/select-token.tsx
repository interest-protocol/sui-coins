import { Token } from '@interest-protocol/sui-tokens';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { TOKEN_ICONS } from '@/constants/coins';
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

  const isMainnet = Network.MAINNET === network;

  const { setValue, control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const Icon = TOKEN_ICONS[network][isMainnet ? currentType : currentSymbol];

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

  const onSelect = async ({ type, decimals, symbol, chain }: Token) => {
    if (type === oppositeType) {
      setValue(label === 'to' ? 'from' : 'to', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        usdPrice: currentToken.usdPrice,
        chain: currentToken.chain,
        value: '',
        locked: false,
      });
    }

    const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) => data[symbol][0].quote.USD.price)
      .catch(() => null);

    setValue(label, {
      type,
      symbol,
      usdPrice,
      decimals,
      chain,
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
      minWidth={['4rem', '8rem', '8rem', '8rem', '10rem']}
    >
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        borderRadius="xs"
        bg="highestContainer"
        onClick={openModal}
        {...(Icon && {
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
          p="xs"
          size="large"
          variant="label"
          display={['none', 'block']}
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

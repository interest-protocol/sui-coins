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

import { DCAForm } from '../dca.types';
import SelectTokenInfo from './select-token-info';

const SelectToken: FC = () => {
  const network = useNetwork();
  const { pathname } = useRouter();
  const { setModal, handleClose } = useModal();

  const isMainnet = Network.MAINNET === network;

  const { setValue, control } = useFormContext<DCAForm>();

  const currentToken = useWatch({
    control,
    name: 'to',
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const Icon = TOKEN_ICONS[network][isMainnet ? currentType : currentSymbol];

  const changeURL = (type: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('to', type);

    updateURL(
      `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
        'to'
      )}`
    );
  };

  const oppositeType = useWatch({
    control,
    name: 'from.type',
  });

  const onSelect = async ({ type, decimals, symbol, chain }: Token) => {
    if (type === oppositeType) {
      setValue('from', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        chain: currentToken.chain,
        usdPrice: currentToken.usdPrice,
        value: '',
      });
    }

    const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) => data[symbol][0].quote.USD.price)
      .catch(() => null);

    setValue('to', {
      type,
      chain,
      symbol,
      usdPrice,
      decimals,
      value: '',
    });

    setValue('from.value', '');

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
    <Box display="flex" flexDirection="column">
      <SelectTokenInfo />
      <Button
        mt="m"
        mx="l"
        fontSize="s"
        variant="outline"
        borderRadius="xs"
        onClick={openModal}
        borderColor="outlineVariant"
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
          flex="1"
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

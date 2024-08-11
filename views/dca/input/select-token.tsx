import { Token } from '@interest-protocol/sui-tokens';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { ChevronDownSVG } from '@/svg';
import { updateURL, ZERO_BIG_NUMBER } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { DCAForm } from '../dca.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const { pathname } = useRouter();
  const { network } = useSuiClientContext();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<DCAForm>();

  const currentToken = useWatch({
    control,
    name: label,
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
      if (label === 'to')
        setValue(label === 'to' ? 'from' : 'to', {
          display: '',
          usdPrice: null,
          value: ZERO_BIG_NUMBER,
          type: currentToken.type,
          chain: currentToken.chain,
          symbol: currentToken.symbol,
          decimals: currentToken.decimals,
        });
    }

    setValue(label, {
      type: type,
      display: '',
      chain: chain,
      usdPrice: null,
      symbol: symbol,
      decimals: decimals,
      value: ZERO_BIG_NUMBER,
    });

    fetch(`/api/auth/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) =>
        setValue(`${label}.usdPrice`, data[symbol][0].quote.USD.price)
      )
      .catch(() => null);

    changeURL(type, type === oppositeType ? currentToken.type : undefined);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          faucet
          simple
          closeModal={handleClose}
          onSelect={onSelect}
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
    <Button
      px="s"
      py="auto"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="xs"
      borderStyle="solid"
      onClick={openModal}
      borderColor="outlineVariant"
      height={label === 'to' ? '3.25rem' : '3rem'}
      bg={label === 'to' ? 'none' : 'lowContainer'}
      borderWidth={label === 'to' ? '1px' : '0px'}
      SuffixIcon={
        <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      }
      {...(currentType &&
        label === 'from' && {
          PrefixIcon: (
            <TokenIcon
              withBg
              rounded
              size="1.1rem"
              type={currentType}
              symbol={currentSymbol}
              network={network as Network}
            />
          ),
        })}
    >
      <Box as="span" display="flex" alignItems="center" gap="xs">
        {currentType && label === 'to' && (
          <TokenIcon
            withBg
            rounded
            size="1.1rem"
            type={currentType}
            symbol={currentSymbol}
            network={network as Network}
          />
        )}
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
      </Box>
    </Button>
  );
};

export default SelectToken;

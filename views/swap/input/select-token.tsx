import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { CoinData } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import { updateURL } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { network } = useNetwork();
  const { pathname } = useRouter();
  const { setModal, handleClose } = useModal();

  const isMainnet = Network.MAINNET === network;

  const { setValue, control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol, type: currentType } = currentToken;

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

  const onSelect = async ({ type, decimals, symbol }: CoinData) => {
    if (type === oppositeType) {
      setValue(label === 'to' ? 'from' : 'to', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        usdPrice: currentToken.usdPrice,
        value: '',
        balance: FixedPointMath.toNumber(
          BigNumber(pathOr(0, [currentToken.type, 'balance'], coinsMap))
        ),
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
      value: '',
      balance: FixedPointMath.toNumber(
        BigNumber(pathOr(0, [type, 'balance'], coinsMap))
      ),
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
    <Box position="relative">
      <Button
        p="2xs"
        fontSize="s"
        variant="tonal"
        borderRadius="xs"
        bg="highestContainer"
        onClick={openModal}
        {...(Icon && {
          PrefixIcon: (
            <TokenIcon
              tokenId={v4()}
              network={'/Users/mariobatalha/www/sui-coins/constants/dapp'}
            />
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

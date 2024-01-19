import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Network, TOKEN_ICONS } from '@/constants';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ChevronRightSVG } from '@/svg';
import { updateURL } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';
import { CoinDataWithBalance } from '@/views/components/select-token-modal/select-token-modal.types';

import { SwapForm } from '../swap.types';
import { TokenProps } from './swap-preview-modal.types';

const Token: FC<TokenProps> = ({ label }) => {
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

  const onSelect = ({ type, decimals, symbol }: CoinDataWithBalance) => {
    if (type === oppositeType) {
      setValue(label === 'to' ? 'from' : 'to', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        value: '',
        balance: FixedPointMath.toNumber(
          pathOr(BigNumber(0), [currentToken.type, 'totalBalance'], coinsMap)
        ),
        locked: false,
      });
    }

    setValue(label, {
      type,
      symbol,
      decimals,
      value: '',
      balance: FixedPointMath.toNumber(
        pathOr(BigNumber(0), [type, 'totalBalance'], coinsMap)
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
        bg="highestContainer"
        p="s"
        borderRadius="xs"
        variant="tonal"
        fontSize="s"
        onClick={openModal}
        {...(Icon && {
          PrefixIcon: (
            <Box as="span" display="inline-block">
              <Icon
                width="100%"
                height="100%"
                maxWidth="1rem"
                maxHeight="1rem"
              />
            </Box>
          ),
        })}
      >
        <Typography size="large" variant="label">
          {currentSymbol ?? 'Select Token'}
        </Typography>
        <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Button>
    </Box>
  );
};

export default Token;

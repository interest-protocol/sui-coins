import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { COINS_MAP } from '@/constants/coins';
import { Network } from '@/constants/network';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import { updateURL } from '@/utils';

import SelectTokenModal from '../components/select-token-modal';
import { SwapForm } from '../swap.types';
import { InputProps as DropdownTokenProps } from './input.types';

const SelectToken: FC<DropdownTokenProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { pathname } = useRouter();
  const { network } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<SwapForm>();

  const { setModal, handleClose } = useModal();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const handleOnSelect = ({ symbol, type, decimals }: any) => {
    const currentToken = COINS_MAP[type];

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
        chain: 'ETH',
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
      chain: 'ETH',
    });
    setValue(`${label === 'from' ? 'to' : 'from'}.value`, '');

    changeURL(type);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(!isOpen);
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={handleOnSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );
  };

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
        borderRadius="xs"
        color="onSurface"
        bg="highestContainer"
        onClick={openModal}
        PrefixIcon={
          <Box
            as="span"
            display="flex"
            width="2.5rem"
            bg="onSurface"
            height="2.5rem"
            color="onPrimary"
            borderRadius="xs"
            alignItems="center"
            justifyContent="center"
          >
            <TokenIcon
              network={network}
              chain={currentToken.chain}
              tokenId={network === Network.DEVNET ? currentType : currentSymbol}
            />
          </Box>
        }
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

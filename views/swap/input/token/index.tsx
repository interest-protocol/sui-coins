import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { COINS_MAP } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-Modal';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ChevronDownSVG } from '@/svg';
import { updateURL } from '@/utils';

import SelectTokenModal from '../../components/select-token-modal';
import { SwapForm } from '../../swap.types';
import { InputProps as DropdownTokenProps } from '../input.types';

const Token: FC<DropdownTokenProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { pathname } = useRouter();
  const { network } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<SwapForm>();

  const { setModal, handleClose } = useModal();

  const { symbol } = useWatch({
    control,
    name: label,
  });

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
    setIsOpen(false);
  };

  const openModal = () =>
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

  const Icon = TOKEN_ICONS[network][symbol];

  return (
    <Box position="relative">
      <Button
        pr="1rem"
        pl="0.5rem"
        variant="tonal"
        fontSize="0.875rem"
        onClick={openModal}
        PrefixIcon={
          <Box
            width="1.5rem"
            display="flex"
            bg="onSurface"
            color="surface"
            height="1.5rem"
            minWidth="1.5rem"
            alignItems="center"
            position="relative"
            borderRadius="full"
            justifyContent="center"
          >
            <Icon maxWidth="1.125rem" maxHeight="1.125rem" width="100%" />
          </Box>
        }
        SuffixIcon={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            rotate={isOpen ? '0deg' : '-90deg'}
          >
            <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Box>
        }
      >
        {symbol}
      </Button>
    </Box>
  );
};

export default Token;

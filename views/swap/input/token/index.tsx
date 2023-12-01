import { Box, Button, ListItem, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { not, pathOr } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { COIN_METADATA, COINS } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ChevronDownSVG } from '@/svg';

import { SwapForm } from '../../swap.types';
import { InputProps as DropdownTokenProps } from '../input.types';

const Token: FC<DropdownTokenProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<SwapForm>();

  const { symbol } = useWatch({
    control,
    name: label,
  });

  const { coinsMap } = useWeb3();

  const Icon = TOKEN_ICONS[symbol];

  return (
    <Box position="relative">
      <Button
        pr="1rem"
        pl="0.5rem"
        variant="tonal"
        fontSize="0.875rem"
        onClick={() => setIsOpen(not)}
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
      {isOpen && (
        <Box
          top="3rem"
          zIndex={1}
          cursor="pointer"
          bg="lowContainer"
          borderRadius="xs"
          position="absolute"
          border="2px solid"
          borderColor="outline"
        >
          {COINS.map(({ symbol, type }) => {
            const Icon = TOKEN_ICONS[symbol];
            return (
              <ListItem
                key={v4()}
                title={symbol}
                onClick={() => {
                  setValue(label, {
                    type,
                    symbol,
                    value: '0',
                    balance: FixedPointMath.toNumber(
                      pathOr(BigNumber(0), [type, 'totalBalance'], coinsMap)
                    ),
                    decimals: COIN_METADATA[type].decimals,
                    locked: false,
                  });

                  setIsOpen(false);
                }}
                PrefixIcon={
                  <Box
                    display="flex"
                    bg="onSurface"
                    color="surface"
                    minWidth="1.5rem"
                    height="1.5rem"
                    borderRadius="xs"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon width="100%" maxWidth="1rem" maxHeight="1rem" />
                  </Box>
                }
                SuffixIcon={
                  <Typography variant="body" size="medium">
                    {type
                      ? FixedPointMath.toNumber(
                          pathOr(BigNumber(0), [type, 'totalBalance'], coinsMap)
                        )
                      : 0}
                  </Typography>
                }
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Token;

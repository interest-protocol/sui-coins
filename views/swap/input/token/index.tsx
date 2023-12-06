import { Box, Button, ListItem, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { not, pathOr } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { COINS, COINS_MAP } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS, TOKEN_SYMBOL } from '@/lib';
import { ChevronDownSVG } from '@/svg';
import { updateURL } from '@/utils';

import { SwapForm } from '../../swap.types';
import { InputProps as DropdownTokenProps } from '../input.types';

const Token: FC<DropdownTokenProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<SwapForm>();

  const changeURL = (type: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(label, type);

    updateURL(
      `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
        'to'
      )}`
    );
  };

  const { symbol, type: currentType } = useWatch({
    control,
    name: label,
  });

  const oppositeType = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}.type`,
  });

  const Icon = TOKEN_ICONS[symbol as TOKEN_SYMBOL];

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
          {COINS.map(({ symbol, type, decimals }) => {
            const Icon = TOKEN_ICONS[symbol];
            return (
              <ListItem
                key={v4()}
                title={symbol}
                onClick={() => {
                  if (type === oppositeType) {
                    const currentToken = COINS_MAP[currentType];

                    setValue(label === 'to' ? 'from' : 'to', {
                      type: currentToken.type,
                      symbol: currentToken.symbol,
                      decimals: currentToken.decimals,
                      value: '',
                      balance: FixedPointMath.toNumber(
                        pathOr(
                          BigNumber(0),
                          [currentToken.type, 'totalBalance'],
                          coinsMap
                        )
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

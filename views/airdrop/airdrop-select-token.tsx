import { Box, ListItem, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { COINS, TOKEN_ICONS, TOKEN_SYMBOL } from '@/constants';
import { ChevronRightSVG, SUISVG } from '@/svg';

import { IAirdropForm } from './airdrop.types';

const AirdropSelectToken: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });

  const TokenIcon = TOKEN_ICONS[token.symbol as TOKEN_SYMBOL] ?? SUISVG;

  return (
    <Box position="relative">
      <Box
        p="s"
        gap="xs"
        display="flex"
        minWidth="8rem"
        cursor="pointer"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        onClick={() => setIsOpen(not)}
      >
        <TokenIcon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        <Typography variant="label" size="large" flex="1" as="span">
          {token.symbol}
        </Typography>
        <Box rotate="90deg">
          <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
      {isOpen && (
        <Box
          zIndex={1}
          top="3.5rem"
          width="100%"
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
                width="100%"
                title={symbol}
                cursor="pointer"
                onClick={() => {
                  setValue('token', {
                    type,
                    symbol,
                    decimals,
                    value: '0',
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
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AirdropSelectToken;

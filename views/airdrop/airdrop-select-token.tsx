import { Box, ListItem, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ChevronRightSVG, DefaultTokenSVG } from '@/svg';

import { IAirdropForm } from './airdrop.types';
import { convertTypeToShortPackedId } from './airdrop.utils';

const BOX_ID = 'dropdown-id';

const AirdropSelectToken: FC = () => {
  const { network } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const { coins, isFetchingCoinBalances } = useWeb3();
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpen(false);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const renderToken = () => {
    if (!token) return null;
    const TokenIcon = TOKEN_ICONS[network][token.symbol] ?? DefaultTokenSVG;
    return <TokenIcon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />;
  };

  return (
    <Box position="relative" id={BOX_ID}>
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
        {renderToken()}
        <Typography variant="label" size="large" flex="1" as="span">
          {token ? token.symbol : '---'}
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
          overflow="auto"
          cursor="pointer"
          maxHeight="20rem"
          bg="lowContainer"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={dropdownRef}
          borderRadius="xs"
          position="absolute"
          border="2px solid"
          borderColor="outline"
        >
          {isFetchingCoinBalances ? (
            <ListItem width="100%" title="Loading..." />
          ) : !coins ? (
            <ListItem width="100%" title="You have no coins" />
          ) : (
            coins.map(({ decimals, symbol, type, totalBalance }) => {
              const Icon = TOKEN_ICONS[network][symbol] ?? DefaultTokenSVG;

              return (
                <ListItem
                  key={v4()}
                  width="100%"
                  cursor="pointer"
                  title={`${symbol} [${convertTypeToShortPackedId(type)}]`}
                  onClick={() => {
                    setValue('decimals', decimals);
                    setValue('token', {
                      type,
                      symbol,
                      decimals,
                      balance: FixedPointMath.toNumber(
                        BigNumber(totalBalance),
                        decimals
                      ),
                    });
                    setIsOpen(false);
                  }}
                  PrefixIcon={
                    <Box
                      display="flex"
                      bg="onSurface"
                      color="surface"
                      height="1.8rem"
                      minWidth="1.8rem"
                      borderRadius="xs"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon width="100%" maxWidth="1.2rem" maxHeight="1.2rem" />
                    </Box>
                  }
                  SuffixIcon={
                    <Typography variant="body" size="medium">
                      {FixedPointMath.toNumber(
                        BigNumber(totalBalance),
                        decimals
                      )}
                    </Typography>
                  }
                />
              );
            })
          )}
        </Box>
      )}
    </Box>
  );
};

export default AirdropSelectToken;

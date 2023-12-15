import { Box, ListItem, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { not, values } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Network, TOKEN_ICONS } from '@/constants';
import { useNetwork } from '@/context/network';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useGetAllCoins } from '@/hooks/use-get-all-coins';
import { FixedPointMath } from '@/lib';
import { ChevronRightSVG, DefaultSVG } from '@/svg';

import { IAirdropForm } from './airdrop.types';
import { convertTypeToShortPackedId, getSymbol } from './airdrop.utils';

const BOX_ID = 'dropdown-id';

const AirdropSelectToken: FC = () => {
  const { network } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetAllCoins();
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
    const TokenIcon =
      TOKEN_ICONS[network][
        (network === Network.MAINNET ? token.type : token.symbol) as string
      ] ?? DefaultSVG;
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
          {token ? getSymbol(token.symbol, token.type) : '---'}
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
          {isLoading ? (
            <ListItem width="100%" title="Loading..." />
          ) : !data ? (
            <ListItem width="100%" title="You have no coins" />
          ) : (
            values(data).map(
              ({ metadata: { decimals, symbol }, coinType, balance }) => {
                const Icon =
                  TOKEN_ICONS[network][
                    network === Network.MAINNET ? coinType : symbol
                  ] ?? DefaultSVG;

                return (
                  <ListItem
                    key={v4()}
                    width="100%"
                    cursor="pointer"
                    title={`${getSymbol(
                      symbol,
                      coinType
                    )} [${convertTypeToShortPackedId(coinType)}]`}
                    onClick={() => {
                      setValue('decimals', decimals);
                      setValue('token', {
                        symbol,
                        decimals,
                        type: coinType,
                        balance: FixedPointMath.toNumber(
                          BigNumber(balance),
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
                        <Icon
                          width="100%"
                          maxWidth="1.2rem"
                          maxHeight="1.2rem"
                        />
                      </Box>
                    }
                    SuffixIcon={
                      <Typography variant="body" size="medium">
                        {FixedPointMath.toNumber(BigNumber(balance), decimals)}
                      </Typography>
                    }
                  />
                );
              }
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default AirdropSelectToken;

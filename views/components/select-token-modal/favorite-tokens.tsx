import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { STRICT_TOKENS, STRICT_TOKENS_MAP } from '@/constants/coins';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { coinDataToCoinObject } from '@/utils';

import { metadataToCoin } from './select-token-modal.utils';

const FavoriteTokens: FC<{ onSelectToken: (coin: CoinObject) => void }> = ({
  onSelectToken,
}) => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const favoriteTokenTypes = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`
  );

  const favoriteTokensMeta = useReadLocalStorage<Record<string, string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens-meta`
  );

  const defaultFavoriteTokens = STRICT_TOKENS[network].slice(0, 2);
  const safeFavoriteTokens = favoriteTokenTypes?.filter(
    (type) => !defaultFavoriteTokens.some((token) => token.type === type)
  );

  const favoriteTokens =
    safeFavoriteTokens?.reduce(
      (acc, type) => [
        ...acc,
        ...(favoriteTokensMeta?.[type]
          ? [{ type, symbol: favoriteTokensMeta[type] }]
          : []),
      ],
      [] as ReadonlyArray<{ type: string; symbol: string }>
    ) ?? [];

  const handleSelectToken = async (type: string) => {
    if (coinsMap[type]) return onSelectToken(coinsMap[type]);

    const token = STRICT_TOKENS_MAP[network as Network][type];

    if (token) return onSelectToken(coinDataToCoinObject(token));

    const metadata = await fetch(
      `/api/auth/v1/coin-metadata?type=${type}&network=${network}`
    ).then((response) =>
      response.status === 200 ? response.json() : response
    );

    return onSelectToken({ ...metadataToCoin(metadata) });
  };

  return (
    <Box display="flex" gap="xs" flexWrap="wrap">
      {[...defaultFavoriteTokens, , ...favoriteTokens]
        .slice(0, 12)
        .map(({ type, symbol }) => (
          <Button
            p="2xs"
            key={v4()}
            variant="outline"
            borderRadius="full"
            borderColor="outlineVariant"
            onClick={() => handleSelectToken(type)}
            PrefixIcon={
              <TokenIcon
                simple
                withBg
                rounded
                type={type}
                size="0.9rem"
                symbol={symbol}
                network={network}
              />
            }
          >
            {symbol.slice(0, 6)}
          </Button>
        ))}
    </Box>
  );
};

export default FavoriteTokens;

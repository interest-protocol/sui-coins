import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC, MouseEventHandler, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { FavoriteSVG } from '@/svg';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  type,
  name,
  chain,
  bridge,
  symbol,
  onClick,
  selected,
}) => {
  const { colors } = useTheme() as Theme;
  const { network } = useSuiClientContext();
  const [isLoading, setLoading] = useState(false);
  const [favoriteTokens, setFavoriteTokens] = useLocalStorage<
    ReadonlyArray<string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`, []);

  const isFavorite = favoriteTokens.includes(type);

  const handleFavoriteTokens: MouseEventHandler = (e) => {
    e.stopPropagation();
    setFavoriteTokens(
      isFavorite
        ? favoriteTokens.filter((favType) => favType !== type)
        : [...favoriteTokens, type]
    );
  };

  const onSelect = () => {
    if (selected) return;
    onClick();
    setLoading(true);
  };

  return (
    <Box
      p="xl"
      display="flex"
      color="textSoft"
      cursor="pointer"
      onClick={onSelect}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
      nHover={{ bg: `${colors.primary}14` }}
      transition="background 500ms ease-in-out"
      bg={selected ? `${colors.primary}14` : 'unset'}
    >
      {isLoading && (
        <Box position="absolute" top="0" right="0" left="0" bottom="0">
          <Skeleton height="100%" />
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <TokenIcon
          withBg
          type={type}
          size="1.6rem"
          symbol={symbol}
          network={network as Network}
        />
        <Box
          ml="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            size="medium"
            display="flex"
            variant="title"
            alignItems="flex-end"
          >
            {symbol}
            {chain && (
              <Typography as="span" variant="label" size="small" opacity="0.6">
                ({chain})
              </Typography>
            )}
          </Typography>
          <Typography
            gap="2xs"
            size="medium"
            display="flex"
            variant="title"
            alignItems="center"
          >
            {name && (
              <Typography variant="body" size="small" opacity="0.6">
                {name}
              </Typography>
            )}
            {name && bridge && '·'}
            {bridge && (
              <Typography variant="body" size="small" opacity="0.6">
                {bridge}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="xs">
        <Button
          isIcon
          zIndex="10"
          variant="text"
          onClick={handleFavoriteTokens}
        >
          <FavoriteSVG
            width="100%"
            maxWidth="1.2rem"
            maxHeight="1.2rem"
            filled={isFavorite}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default TokenModalItem;

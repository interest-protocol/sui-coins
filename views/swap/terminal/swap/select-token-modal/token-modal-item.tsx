import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC, MouseEventHandler, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { FavoriteSVG } from '@/components/svg';
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/hooks/use-network';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  type,
  name,
  symbol,
  onClick,
  selected,
}) => {
  const network = useNetwork();
  const { colors } = useTheme() as Theme;
  const [isLoading, setLoading] = useState(false);
  const [favoriteTokens, setFavoriteTokens] = useLocalStorage<
    ReadonlyArray<string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`, []);
  const [favoriteTokensMeta, setFavoriteTokensMeta] = useLocalStorage<
    Record<string, string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens-meta`, {});

  const isFavorite = favoriteTokens.includes(type);

  const handleFavoriteTokens: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (isFavorite) {
      setFavoriteTokens(favoriteTokens.filter((favType) => favType !== type));
      delete favoriteTokensMeta[type];
      setFavoriteTokensMeta(favoriteTokensMeta);
      return;
    }

    setFavoriteTokens([...favoriteTokens, type]);
    setFavoriteTokensMeta({ ...favoriteTokensMeta, [type]: symbol });
  };

  const onSelect = () => {
    if (selected) return;
    onClick();
    setLoading(true);
  };

  return (
    <Box
      p="s"
      display="flex"
      color="textSoft"
      cursor="pointer"
      borderRadius="xs"
      border="1px solid"
      onClick={onSelect}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
      transition="background 500ms ease-in-out"
      bg={selected ? `${colors.primary}14` : 'unset'}
      borderColor={selected ? 'primary' : 'outlineVariant'}
      nHover={{ bg: `${colors.primary}14`, borderColor: 'primary' }}
    >
      {isLoading && (
        <Box position="absolute" top="0" right="0" left="0" bottom="0">
          <Skeleton height="100%" />
        </Box>
      )}
      <Box display="flex" alignItems="center" gap="xs">
        <TokenIcon
          withBg
          type={type}
          size="1.3rem"
          symbol={symbol}
          network={network}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            size="medium"
            variant="title"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxWidth={['unset', '5rem']}
          >
            {symbol}
          </Typography>
          <Typography
            gap="2xs"
            size="medium"
            display="flex"
            variant="title"
            alignItems="center"
          >
            {name && (
              <Typography
                size="small"
                opacity="0.6"
                variant="body"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                maxWidth={['unset', '5rem']}
              >
                {name}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
      <Button isIcon p="0" variant="text" onClick={handleFavoriteTokens}>
        <FavoriteSVG
          width="100%"
          maxWidth="1.2rem"
          maxHeight="1.2rem"
          filled={isFavorite}
        />
      </Button>
    </Box>
  );
};

export default TokenModalItem;

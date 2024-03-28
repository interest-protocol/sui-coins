import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC, MouseEventHandler, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FavoriteSVG } from '@/svg';
import { getSymbolByType } from '@/utils';

import { ObjectModalItemProps } from './select-object-modal.types';

const ObjectModalItem: FC<ObjectModalItemProps> = ({
  type,
  display,
  onClick,
  selected,
}) => {
  const network = useNetwork();
  const { colors } = useTheme() as Theme;
  const [isLoading, setLoading] = useState(false);
  const [favoriteObjects, setFavoriteObjects] = useLocalStorage<
    ReadonlyArray<string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`, []);

  const isFavorite = favoriteObjects.includes(type);

  const handleFavoriteObjects: MouseEventHandler = (e) => {
    e.stopPropagation();
    setFavoriteObjects(
      isFavorite
        ? favoriteObjects.filter((favType) => favType !== type)
        : [...favoriteObjects, type]
    );
  };

  const onSelect = () => {
    if (selected) return;
    onClick();
    setLoading(true);
  };

  const displayName = display
    ? (display as Record<string, string>).name ?? display.symbol ?? type
    : type;

  const { symbol, type: coinType } = (display as CoinObject) ?? {
    type,
    symbol: getSymbolByType(type),
  };

  const url = (display as Record<string, string>)?.image_url;

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
          size="1.6rem"
          symbol={symbol}
          {...(url ? { url } : { type: coinType, network })}
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
            {type === displayName ? formatAddress(type) : displayName}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="xs">
        <Button
          isIcon
          zIndex="10"
          variant="text"
          onClick={handleFavoriteObjects}
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

export default ObjectModalItem;

import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC, MouseEventHandler, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { FavoriteSVG } from '@/svg';
import { getSymbolByType } from '@/utils';

import { CoinObject } from '../../../components/web3-manager/coins-manager/coins-manager.types';
import { ObjectModalItemProps } from './select-object-modal.types';

const ObjectModalItem: FC<ObjectModalItemProps> = ({
  type,
  display,
  onClick,
  selected,
}) => {
  const { colors } = useTheme() as Theme;
  const { network } = useSuiClientContext();
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
    ? ((display as Record<string, string>).name ?? display.symbol ?? type)
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
          url={url}
          size="1.6rem"
          symbol={symbol}
          type={coinType}
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
            variant="title"
            maxWidth="12ch"
            overflow="hidden"
            whiteSpace="nowrap"
            alignItems="flex-end"
            textOverflow="ellipsis"
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

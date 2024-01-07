import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/context/network';
import { FavoriteSVG } from '@/svg';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  type,
  Icon,
  symbol,
  origin,
  balance,
  onClick,
  selected,
  isSuggested,
}) => {
  const { network } = useNetwork();
  const [favoriteTokens, setFavoriteTokens] = useLocalStorage<
    ReadonlyArray<string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-tokens`, []);

  const isFavorite = favoriteTokens.includes(type);

  const handleFavoriteTokens = () =>
    setFavoriteTokens(
      isFavorite
        ? favoriteTokens.filter((favType) => favType !== type)
        : [...favoriteTokens, type]
    );

  return (
    <Box
      p="1rem"
      display="flex"
      color="textSoft"
      cursor="pointer"
      alignItems="center"
      nHover={{ bg: 'rgba(0, 83, 219, 0.08)' }}
      justifyContent="space-between"
      bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'unset'}
      onClick={selected ? undefined : onClick}
      transition="background 500ms ease-in-out"
    >
      <Box display="flex" alignItems="center">
        <Box
          bg="black"
          color="white"
          display="flex"
          width="2.5rem"
          height="2.5rem"
          alignItems="center"
          borderRadius="0.5rem"
          justifyContent="center"
        >
          <Icon filled width="100%" maxWidth="1.6rem" maxHeight="1.6rem" />
        </Box>
        <Box
          ml="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="title" size="medium">
            {symbol}
          </Typography>
          {origin && (
            <Typography variant="body" size="small">
              {origin}
            </Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="xs">
        {!isSuggested && (
          <Typography variant="body" size="large">
            {balance}
          </Typography>
        )}
        <Button
          isIcon
          zIndex="10"
          variant="text"
          onClick={handleFavoriteTokens}
        >
          <FavoriteSVG
            width="100%"
            maxWidth="1rem"
            maxHeight="1rem"
            filled={isFavorite}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default TokenModalItem;

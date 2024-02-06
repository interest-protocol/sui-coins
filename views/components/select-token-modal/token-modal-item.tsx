import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC, MouseEventHandler } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { FavoriteSVG } from '@/svg';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  type,
  symbol,
  origin,
  onClick,
  selected,
}) => {
  const { network } = useNetwork();
  const { colors } = useTheme() as Theme;
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

  return (
    <Box
      p="xl"
      display="flex"
      color="textSoft"
      cursor="pointer"
      alignItems="center"
      justifyContent="space-between"
      nHover={{ bg: `${colors.primary}14` }}
      onClick={selected ? undefined : onClick}
      transition="background 500ms ease-in-out"
      bg={selected ? `${colors.primary}14` : 'unset'}
    >
      <Box display="flex" alignItems="center">
        <Box
          bg="black"
          color="white"
          display="flex"
          width="2.5rem"
          height="2.5rem"
          borderRadius="xs"
          alignItems="center"
          justifyContent="center"
        >
          <TokenIcon
            network={network}
            maxWidth="1.6rem"
            maxHeight="1.6rem"
            tokenId={network === Network.MAINNET ? type : symbol}
          />
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

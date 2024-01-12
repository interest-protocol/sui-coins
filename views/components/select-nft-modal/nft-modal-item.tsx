import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { TokenIcon } from '@/components';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { FavoriteSVG } from '@/svg';

import { NFTModalItemProps } from './select-nft-modal.types';

const NFTModalItem: FC<NFTModalItemProps> = ({
  type,
  symbol,
  origin,
  balance,
  onClick,
  selected,
}) => {
  const { network } = useNetwork();
  const [favoriteTokens, setFavoriteTokens] = useLocalStorage<
    ReadonlyArray<string>
  >(`${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-nft`, []);

  const isFavorite = favoriteTokens.includes(type);

  const handleFavoriteNFT = () =>
    setFavoriteTokens(
      isFavorite
        ? favoriteTokens.filter((favType) => favType !== type)
        : [...favoriteTokens, type]
    );

  return (
    <Box
      p="xl"
      display="flex"
      color="textSoft"
      cursor="pointer"
      alignItems="center"
      justifyContent="space-between"
      onClick={selected ? undefined : onClick}
      transition="background 500ms ease-in-out"
      nHover={{ bg: 'rgba(0, 83, 219, 0.08)' }}
      bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'unset'}
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
        <Typography variant="body" size="large">
          {balance}
        </Typography>
        <Button isIcon zIndex="10" variant="text" onClick={handleFavoriteNFT}>
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

export default NFTModalItem;

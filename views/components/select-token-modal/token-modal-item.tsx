import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { FavoriteSVG } from '@/svg';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  Icon,
  symbol,
  symbol2,
  balance,
  onClick,
  selected,
  isFavorite,
  favorite,
}) => {
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
          color="surface"
          bg="#000"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="0.5rem"
          width="2.5rem"
          height="2.5rem"
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
          <Typography variant="body" size="small">
            {symbol2}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="xs">
        <Typography variant="body" size="large">
          {balance}
        </Typography>
        {favorite && (
          <Button zIndex="10" variant="text" isIcon>
            <FavoriteSVG
              width="100%"
              maxWidth="1rem"
              maxHeight="1rem"
              filled={isFavorite}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TokenModalItem;

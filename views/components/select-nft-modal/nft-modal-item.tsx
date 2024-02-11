import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { NFTModalItemProps } from './select-nft-modal.types';

const NFTModalItem: FC<NFTModalItemProps> = ({
  img,
  name,
  total,
  onClick,
  selected,
  updatedAt,
}) => {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Box
      p="xl"
      display="flex"
      cursor="pointer"
      color="onSurface"
      alignItems="center"
      justifyContent="space-between"
      onClick={selected ? undefined : onClick}
      transition="background 500ms ease-in-out"
      nHover={{ bg: 'rgba(0, 83, 219, 0.08)' }}
      bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'unset'}
    >
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          width="2.5rem"
          height="2.5rem"
          overflow="hidden"
          borderRadius="xs"
          alignItems="center"
          position="relative"
          justifyContent="center"
        >
          {isImageLoading && (
            <Box position="absolute" top="-0.5rem">
              <ProgressIndicator size={16} variant="loading" />
            </Box>
          )}
          <img
            src={img}
            alt={name}
            width="100%"
            onLoad={() => setImageLoading(false)}
          />
        </Box>
        <Box
          ml="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="title" size="medium">
            {name}
          </Typography>
        </Box>
      </Box>
      <Box
        gap="2xs"
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
      >
        <Typography variant="body" size="small">
          {total} addresses
        </Typography>
        <Typography variant="body" size="small">
          Last update: {new Date(updatedAt!).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default NFTModalItem;

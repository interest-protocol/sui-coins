import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { DownloadSVG } from '@/svg';

import { SuiPlayModalItemProps } from './select-sui-play-modal.types';
import { getSuiPlayHoldersJSON } from './select-sui-play-modal.utils';

const SuiPlayModalItem: FC<SuiPlayModalItemProps> = ({
  tier,
  image,
  holders,
  onClick,
  selected,
  updatedAt,
}) => {
  const [isDownloading, setDownloading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <Box
      p="xl"
      display="flex"
      cursor="pointer"
      borderRadius="xs"
      color="onSurface"
      alignItems="center"
      justifyContent="space-between"
      onClick={selected ? undefined : onClick}
      transition="background 500ms ease-in-out"
      nHover={{ bg: 'rgba(0, 83, 219, 0.08)' }}
      bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'lowestContainer'}
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
            alt={tier}
            src={image}
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
            {tier}
          </Typography>
        </Box>
      </Box>
      <Box
        gap="2xs"
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
      >
        <Box gap="xs" display="flex" alignItems="center">
          <Typography variant="body" size="small">
            {holders} addresses
          </Typography>
          <Button
            p="0"
            variant="text"
            width="1.25rem"
            height="1.25rem"
            borderRadius="6px"
            alignItems="center"
            justifyContent="center"
            onClick={(e) => {
              e.stopPropagation();
              setDownloading(true);
              getSuiPlayHoldersJSON(tier, updatedAt!).then(() =>
                setDownloading(false)
              );
            }}
          >
            {isDownloading ? (
              <Box mt="-1rem">
                <ProgressIndicator variant="loading" size={12} />
              </Box>
            ) : (
              <DownloadSVG
                width="100%"
                maxWidth="0.825rem"
                maxHeight="0.825rem"
              />
            )}
          </Button>
        </Box>
        <Typography variant="body" size="small" color="outline">
          Last update: {new Date(updatedAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuiPlayModalItem;

import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowObliqueSVG } from '@/svg';

import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({
  name,
  Logo,
  dexUrl,
  tags,
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" flexWrap="wrap" alignItems="center">
      <a target="_blank" href={dexUrl} rel="noreferrer">
        <Tag
          p="0"
          mr="2xs"
          mb="2xs"
          gap="0"
          PrefixIcon={
            <Box
              display="flex"
              width="1.4rem"
              height="1.4rem"
              alignItems="center"
              borderRadius="full"
              color="lowestContainer"
              justifyContent="center"
            >
              {Logo}
            </Box>
          }
          size="small"
          variant="outline"
        >
          <Typography size="small" variant="label">
            {name}
          </Typography>
        </Tag>
      </a>
      {tags?.map(({ name }) => (
        <Tag
          key={v4()}
          px="0"
          py="0"
          mb="2xs"
          mr="2xs"
          size="small"
          height="1.4rem"
          variant="outline"
        >
          <Typography size="small" variant="label">
            {name}
          </Typography>
        </Tag>
      ))}
    </Box>
    <Button
      mb="auto"
      isIcon
      opacity="0"
      variant="text"
      color="onSurface"
      className="arrow-wrapper"
      nHover={{
        bg: 'surface',
      }}
    >
      <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
    </Button>
  </Box>
);

export default PoolCardHeader;

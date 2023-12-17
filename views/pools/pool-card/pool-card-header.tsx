import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { ArrowObliqueSVG } from '@/svg';

import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({
  name,
  Logo,
  dexUrl,
  objectId,
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <a target="_blank" href={dexUrl} rel="noreferrer">
      <Tag
        PrefixIcon={
          <Box
            display="flex"
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
    <Link href={`${Routes[RoutesEnum.PoolDetails]}?objectId=${objectId}`}>
      <Button isIcon opacity="0" variant="text" className="arrow-wrapper">
        <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
      </Button>
    </Link>
  </Box>
);

export default PoolCardHeader;

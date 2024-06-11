import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowObliqueSVG } from '@/svg';

import { HeaderCardTagIcon } from './pool-card.data';
import { FormFilterValue, PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({ tags }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" flexWrap="wrap" alignItems="center">
      {tags?.map((tag) => {
        const TagIcon =
          HeaderCardTagIcon[
            tag as
              | 'AMM'
              | 'CLAMM'
              | FormFilterValue.stable
              | FormFilterValue.volatile
          ];
        return (
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
            <Box display="flex" gap="xs">
              <Box width="1rem" height="1rem" display="flex">
                <TagIcon maxWidth="100%" maxHeight="100%" width="100%" />
              </Box>

              <Typography size="small" variant="label">
                {tag}
              </Typography>
            </Box>
          </Tag>
        );
      })}
    </Box>
    <Button
      mb="auto"
      isIcon
      opacity="0"
      variant="text"
      color="onSurface"
      className="arrow-wrapper"
      nHover={{ bg: 'surface' }}
    >
      <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
    </Button>
  </Box>
);

export default PoolCardHeader;

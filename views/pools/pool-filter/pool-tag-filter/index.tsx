import { Box, Tag } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ErrorSVG } from '@/svg';

import { PoolTagFilterProps } from './pool-tag-filter.types';

const PoolTagFilter: FC<PoolTagFilterProps> = ({ tagOption }) => (
  <Box
    ml="m"
    mt="l"
    py="2xs"
    display="flex"
    minWidth="100%"
    bg="blue"
    alignItems="center"
    flexDirection={['column', 'column', 'column', 'row']}
    justifyContent={['center', 'center', 'center', 'flex-start']}
  >
    {tagOption ? (
      <Tag
        PrefixIcon={
          <Box
            p=".1875rem"
            width="2rem"
            display="flex"
            height="2rem"
            alignItems="center"
            borderRadius="full"
            justifyContent="center"
          >
            <ErrorSVG maxHeight="1.125rem" maxWidth="1.125rem" width="100%" />
          </Box>
        }
        size="large"
        variant="filled"
        mx="2xs"
        bg="surface"
        color="onSurface"
        nHover={{
          background: 'onSurface',
          color: 'surface',
        }}
      >
        {tagOption}
      </Tag>
    ) : (
      ''
    )}
  </Box>
);

export default PoolTagFilter;

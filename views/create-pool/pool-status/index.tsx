import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolStatusLinesProps } from './pool-status.types';

const PoolStatus: FC<PoolStatusLinesProps> = ({ lines }) => (
  <Box
    px="1rem"
    py="0.5rem"
    bg="surface"
    display="flex"
    borderRadius="1rem"
    flexDirection="column"
  >
    {lines.map((line, index) => (
      <Box
        key={v4()}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        alignSelf="stretch"
        py="0.5rem"
        borderBottom="1px solid"
        borderColor={
          lines.length - 1 > index ? 'outlineVariant' : 'transparent'
        }
      >
        <Typography
          flex="1"
          size="medium"
          variant="body"
          color="outline"
          textTransform="capitalize"
        >
          {line.description}:
        </Typography>
        <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Typography
            color="onSurface"
            size="medium"
            variant="body"
            pr="0.5rem"
          >
            {line.amount} {line.type}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);

export default PoolStatus;

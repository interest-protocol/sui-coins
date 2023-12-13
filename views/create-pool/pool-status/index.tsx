import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolStatusLinesProps } from './pool-status.types';

const PoolStatus: FC<PoolStatusLinesProps> = ({ lines }) => (
  <Box
    p="xl"
    display="flex"
    flexDirection="column"
    gap="m"
    bg="surface"
    borderRadius="1rem"
    px="1rem"
    py="0.5rem"
    width={['100%', '100%', '100%', '100%']}
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
          textTransform="capitalize"
          color="outline"
          size="medium"
          variant="body"
        >
          {line.description}:
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          minWidth="10rem"
        >
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

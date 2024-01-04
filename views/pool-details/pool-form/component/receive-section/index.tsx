import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import ReceiveSectionLine from './line';
import { ReceiveSectionProps } from './receive-section.types';

const PoolReceiveSection: FC<ReceiveSectionProps> = ({ items }) => {
  return (
    <Box>
      <Typography variant="body" size="large" mb="1rem">
        You will receive
      </Typography>
      <Box borderRadius="xs" bg="surface" py="0.5rem">
        {items.map((item) => (
          <ReceiveSectionLine key={v4()} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default PoolReceiveSection;

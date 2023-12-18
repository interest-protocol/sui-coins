import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolTradeInfoProps } from '../pool-card.types';
import LineInfo from './line';

const CardTradeInfo: FC<PoolTradeInfoProps> = ({ lines }) => (
  <Box
    bg="surface"
    borderRadius="1rem"
    px="1rem"
    py="0.5rem"
    mb="1rem"
    width="calc(100% - 2rem)"
  >
    {lines.map((line, index) => (
      <LineInfo key={v4()} {...line} lastLine={lines.length - 1 > index} />
    ))}
  </Box>
);

export default CardTradeInfo;

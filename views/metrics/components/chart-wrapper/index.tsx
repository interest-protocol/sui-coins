import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { ChartHeaderProps } from './chart.types';
import ChartHeader from './header';

const ChartWrapper: FC<PropsWithChildren<ChartHeaderProps>> = ({
  children,
  ...props
}) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    borderRadius="xs"
    color="onSurface"
    gridColumn="1/-1"
    flexDirection="column"
    bg="lowestContainer"
    py="xl"
  >
    <Box display="flex" flexDirection="column">
      <ChartHeader {...props} />
      {children}
    </Box>
  </Box>
);

export default ChartWrapper;

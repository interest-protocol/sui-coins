import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { CardWrapperProps } from './card-wrapper.types';

const PoolTransactionCardWrapper: FC<PropsWithChildren<CardWrapperProps>> = ({
  title,
  Suffix,
  children,
}) => {
  return (
    <Box bg="lowestContainer" borderRadius="2rem" p={['m', 'm', 'm', 'xl']}>
      <Box display="flex" justifyContent="space-between" mb="m">
        <Typography variant="label" size="large">
          {title}
        </Typography>
        {Suffix}
      </Box>
      <Box display="flex" flexDirection="column" gap="0.5rem">
        {children}
      </Box>
    </Box>
  );
};

export default PoolTransactionCardWrapper;

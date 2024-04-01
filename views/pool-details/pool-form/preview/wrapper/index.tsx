import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { PoolPreviewWrapperProps } from '../preview.types';
import PoolPreviewWrapperFooter from './footer';
import PoolPreviewWrapperHeader from './header';

const PoolPreviewWrapper: FC<PropsWithChildren<PoolPreviewWrapperProps>> = ({
  isDeposit,
  onSubmit,
  children,
}) => (
  <Motion
    layout
    display="flex"
    bg="container"
    height="41rem"
    minWidth="22rem"
    maxHeight="90vh"
    maxWidth="27rem"
    color="onSurface"
    borderRadius="xs"
    flexDirection="column"
    boxShadow="0 0 5px #3334"
    transition={{ duration: 0.3 }}
  >
    <PoolPreviewWrapperHeader isDeposit={isDeposit} />
    <Box
      px="xl"
      display="flex"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
    >
      {children}
      <PoolPreviewWrapperFooter isDeposit={isDeposit} onSubmit={onSubmit} />
    </Box>
  </Motion>
);

export default PoolPreviewWrapper;

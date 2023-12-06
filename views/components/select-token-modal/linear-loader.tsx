import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LineLoaderSVG } from '@/svg';

import { LinearLoaderProps } from './select-token-modal.types';

const LinearLoader: FC<LinearLoaderProps> = ({ loading }) =>
  loading ? (
    <Box mb="l">
      <LineLoaderSVG width="100%" />
    </Box>
  ) : null;

export default LinearLoader;

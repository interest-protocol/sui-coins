import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PreviewModalHeaderProps } from './swap-preview-modal.types';

const PreviewModalHeader: FC<PreviewModalHeaderProps> = ({
  label,
  alternativeText,
}) => (
  <Box px="2xs" display="flex">
    <Typography variant="label" size="small">
      {label} {label === 'to' && `(${alternativeText}):`}
    </Typography>
  </Box>
);

export default PreviewModalHeader;

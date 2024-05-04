import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { IncineratorNoAssetsSVG } from '@/svg';

const IncineratorNoAsset: FC = () => (
  <Box
    gap="s"
    display="flex"
    height="50vh"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    width="100%"
  >
    <Box p="m">
      <IncineratorNoAssetsSVG
        maxHeight="7.375rem"
        maxWidth="6.625rem"
        width="100%"
      />
    </Box>
    <Typography variant="label" size="medium">
      You don’t have any assets
    </Typography>
  </Box>
);

export default IncineratorNoAsset;

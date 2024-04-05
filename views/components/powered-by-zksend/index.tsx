import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ZkSendSVG } from '@/svg';

const PoweredByZkSend: FC = () => (
  <Box textAlign="center">
    <a target="_blank" rel="noopener, noreferrer" href="https://zksend.com">
      <Box
        gap="xs"
        scale="0.9"
        opacity="0.7"
        display="flex"
        bottom="-0.75rem"
        alignItems="flex-end"
        filter="grayscale(100%)"
        justifyContent="center"
        translate="all 300ms ease-in-out"
        nHover={{
          opacity: '1',
          filter: 'grayscale(0%)',
        }}
      >
        <Typography variant="body" size="small">
          Powered by
        </Typography>
        <ZkSendSVG width="100%" maxWidth="1.2rem" maxHeight="1.2rem" />
        <Typography
          px="2xs"
          size="small"
          variant="label"
          borderRadius="2xs"
          border="1px solid"
          borderColor="outline"
        >
          BETA
        </Typography>
      </Box>
    </a>
  </Box>
);

export default PoweredByZkSend;

import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { LogoSVG } from '@/svg';

import { SuccessModalProps } from './success-modal.types';

const SuccessModal: FC<PropsWithChildren<SuccessModalProps>> = ({
  transactionTime,
  children,
}) => {
  return (
    <Box width="100%">
      <Box display="flex" flexDirection="column" gap="m" mb="2rem">
        {children}
        <Typography
          color="outlineVariant"
          textAlign="center"
          variant="body"
          size="medium"
          fontSize="0.75rem"
          lineHeight="1.5rem"
          fontWeight="400"
        >
          Execution time:
          <Typography
            color="primary"
            textAlign="center"
            variant="body"
            size="medium"
            as="span"
            fontSize="0.75rem"
            lineHeight="1.5rem"
          >
            {` ${transactionTime}s`}
          </Typography>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb="0.5rem">
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          variant="headline"
          size="small"
          display="flex"
          fontSize="1rem"
          lineHeight="1.406rem"
        >
          BY:
        </Typography>
        <Box
          ml="0.75rem"
          display="flex"
          minWidth="1.5rem"
          minHeight="1.5rem"
          alignItems="center"
          justifyContent="center"
        >
          <LogoSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
        </Box>
        <Box ml="0.5rem" display="flex" alignItems="center">
          <Typography
            size="medium"
            variant="title"
            fontWeight="700"
            color="onSurface"
            width="max-content"
            fontSize="0.75rem"
            lineHeight="1.125rem"
          >
            SUI COINS
          </Typography>
        </Box>
      </Box>
      <a
        href="https://www.suicoins.com"
        target="_blank"
        rel="noopener, noreferrer"
      >
        <Typography
          alignItems="center"
          textAlign="center"
          variant="body"
          size="small"
          display="flex"
          lineHeight="1.5rem"
          fontSize="0.75rem"
          width="fit-content"
          mx="auto"
          color="primary"
          mt="0.5rem"
        >
          www.suicoins.com
        </Typography>
      </a>
    </Box>
  );
};

export default SuccessModal;

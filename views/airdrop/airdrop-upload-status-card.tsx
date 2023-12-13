import {
  Box,
  Tag,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { FileSVG } from '@/svg';

import { AirdropUploadStatusCardProps } from './airdrop.types';

const COLORS = {
  failed: { bg: 'errorContainer', color: 'onErrorContainer' },
  complete: { bg: 'successContainer', color: 'onSuccessContainer' },
  pending: { bg: 'container', color: 'onSurface' },
};

const AirdropUploadStatusCard: FC<AirdropUploadStatusCardProps> = ({
  index,
  status,
}) => {
  const { colors } = useTheme() as Theme;

  return (
    <Box
      p="m"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      borderColor="outlineVariant"
      justifyContent="space-between"
    >
      <Box display="flex" gap="m">
        <Box
          display="flex"
          color="primary"
          width="2.5rem"
          height="2.5rem"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
          bg={`${colors.primary}14`}
        >
          <FileSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
        </Box>
        <Box>
          <Typography variant="body" size="large">
            Batch {index}
          </Typography>
          <Typography variant="body" size="small" opacity="0.48">
            50 addresses
          </Typography>
        </Box>
      </Box>
      <Tag variant="filled" {...COLORS[status]} nHover={COLORS[status]}>
        <Typography as="span" variant="label" size="large">
          {status}
        </Typography>
      </Tag>
    </Box>
  );
};

export default AirdropUploadStatusCard;

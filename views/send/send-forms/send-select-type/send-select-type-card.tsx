import { Box, Typography } from '@interest-protocol/ui-kit';
import type { FC } from 'react';

import { SendSelectTypeCardProps } from './send-select-type.types';

const SendSelectTypeCard: FC<SendSelectTypeCardProps> = ({
  title,
  onSelect,
  description,
  illustration,
}) => (
  <Box
    p="2xl"
    gap="xl"
    width="19rem"
    display="flex"
    bg="lowestContainer"
    cursor="pointer"
    borderRadius="xs"
    onClick={onSelect}
    alignItems="center"
    flexDirection="column"
    transition="scale 300ms ease-in-out"
    nHover={{ boxShadow: '0 2rem 3rem #0004', scale: '1.02' }}
  >
    <Box color="primary">{illustration}</Box>
    <Box color="onSurface">
      <Typography size="small" variant="headline" textAlign="center">
        {title}
      </Typography>
      <Typography px="l" size="medium" variant="body" textAlign="center">
        {description}
      </Typography>
    </Box>
  </Box>
);

export default SendSelectTypeCard;

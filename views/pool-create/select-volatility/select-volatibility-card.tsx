import { Box, Typography } from '@interest-protocol/ui-kit';
import type { FC } from 'react';

import type { SelectVolatilityCardProps } from './select-volatibility.types';

const SelectVolatilityCard: FC<SelectVolatilityCardProps> = ({
  title,
  description,
  illustration,
}) => (
  <Box
    p="2xl"
    width="16rem"
    borderRadius="xs"
    bg="lowestContainer"
    nHover={{ boxShadow: '0 2rem 3rem #0004' }}
  >
    <Box color="primary">{illustration}</Box>
    <Typography
      size="small"
      variant="headline"
      color="onSurface"
      textAlign="center"
    >
      {title}
    </Typography>
    <Typography
      px="l"
      size="medium"
      variant="body"
      color="onSurface"
      textAlign="center"
    >
      {description}
    </Typography>
  </Box>
);

export default SelectVolatilityCard;

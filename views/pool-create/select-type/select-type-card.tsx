import { Box, Typography } from '@interest-protocol/ui-kit';
import type { FC } from 'react';

import type { SelectTypeCardProps } from './select-volatibility.types';

const SelectTypeCard: FC<SelectTypeCardProps> = ({
  title,
  onSelect,
  isSelected,
  description,
  illustration,
}) => (
  <Box
    p="2xl"
    gap="xl"
    width="16rem"
    display="flex"
    cursor="pointer"
    borderRadius="xs"
    onClick={onSelect}
    alignItems="center"
    flexDirection="column"
    transition="scale 300ms ease-in-out"
    nHover={{ boxShadow: '0 2rem 3rem #0004', scale: '1.02' }}
    bg={isSelected ? 'primary' : 'lowestContainer'}
  >
    <Box color={isSelected ? 'onPrimary' : 'primary'}>{illustration}</Box>
    <Box color={isSelected ? 'onPrimary' : 'onSurface'}>
      <Typography size="small" variant="headline" textAlign="center">
        {title}
      </Typography>
      <Typography px="l" size="medium" variant="body" textAlign="center">
        {description}
      </Typography>
    </Box>
  </Box>
);

export default SelectTypeCard;

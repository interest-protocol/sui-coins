import { Box, Typography } from '@interest-protocol/ui-kit';
import type { FC } from 'react';

import { noop } from '@/utils';

import type { SelectTypeCardProps } from './select-volatibility.types';

const SelectTypeCard: FC<SelectTypeCardProps> = ({
  title,
  disabled,
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
    alignItems="center"
    flexDirection="column"
    opacity={disabled ? 0.7 : 1}
    onClick={disabled ? noop : onSelect}
    transition="scale 300ms ease-in-out"
    bg={isSelected ? 'primary' : 'lowestContainer'}
    nHover={!disabled && { boxShadow: '0 2rem 3rem #0004', scale: '1.02' }}
  >
    <Box color={isSelected ? '#0053DB' : 'primary'}>{illustration}</Box>
    <Box color={isSelected ? '#00174B' : 'onSurface'}>
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

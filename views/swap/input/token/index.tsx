import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TOKEN_ICONS } from '@/lib';

import { SwapForm } from '../../swap.types';
import { InputProps as DropdownTokenProps } from '../input.types';

const Token: FC<DropdownTokenProps> = ({ label }) => {
  const { control } = useFormContext<SwapForm>();

  const { symbol } = useWatch({
    control,
    name: label,
  });

  const Icon = TOKEN_ICONS[symbol];

  return (
    <Button
      pr="1rem"
      pl="0.5rem"
      variant="tonal"
      fontSize="0.875rem"
      PrefixIcon={
        <Box
          width="1.5rem"
          display="flex"
          bg="onSurface"
          color="surface"
          height="1.5rem"
          minWidth="1.5rem"
          alignItems="center"
          position="relative"
          borderRadius="full"
          justifyContent="center"
        >
          <Icon maxWidth="1.125rem" maxHeight="1.125rem" width="100%" />
        </Box>
      }
    >
      {symbol}
    </Button>
  );
};

export default Token;

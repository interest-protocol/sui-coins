import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/svg';

import { SwapMessagesEnum } from './swap.data';

const SwapMessages: FC = () => {
  const { colors } = useTheme() as Theme;

  const { control } = useWatch();

  const error = useWatch({ control, name: 'error' });

  const isLeastOneSuiErrorMessage = SwapMessagesEnum.leastOneSui == error;

  if (!error) return null;

  return (
    <Box
      p="s"
      mx="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      bg={isLeastOneSuiErrorMessage ? 'lowContainer' : 'errorContainer'}
      color={isLeastOneSuiErrorMessage ? 'outline' : 'onErrorContainer'}
      borderColor={isLeastOneSuiErrorMessage ? 'outline' : 'onErrorContainer'}
    >
      <DotErrorSVG
        dotColor={
          isLeastOneSuiErrorMessage ? colors.lowContainer : colors.error
        }
        maxHeight="1rem"
        maxWidth="1rem"
        width="100%"
      />
      <Typography variant="label" size="medium">
        {error}
      </Typography>
    </Box>
  );
};

export default SwapMessages;

import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/components/svg';

import { SwapMessagesEnum } from './swap.data';

const SwapMessages: FC = () => {
  const { colors } = useTheme() as Theme;

  const { control } = useWatch();

  const error = useWatch({ control, name: 'error' });

  if (!error) return null;

  const isCustomErrorBoxMessage = [
    SwapMessagesEnum.leastOneSui,
    SwapMessagesEnum.notEnoughToken,
  ].includes(error);

  return (
    <Box
      p="s"
      mx="xl"
      my="4xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      bg={isCustomErrorBoxMessage ? 'lowContainer' : 'errorContainer'}
      color={isCustomErrorBoxMessage ? 'outline' : 'onErrorContainer'}
      borderColor={isCustomErrorBoxMessage ? 'outline' : 'onErrorContainer'}
    >
      <DotErrorSVG
        dotColor={isCustomErrorBoxMessage ? colors.lowContainer : colors.error}
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

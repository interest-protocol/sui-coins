import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { ComputerEyesSVG, DiedComputerSVG } from '@/svg';

import { ErrorProps } from './error.types';

const Error: FC<ErrorProps> = ({ message, linkGoTo }) => {
  const { push } = useRouter();

  return (
    <Box color="onSurface" bg="surface" minHeight="100vh">
      <Box width="100%" maxWidth="60rem" position="relative" mx="auto">
        <Motion
          top="22%"
          width="6%"
          left="40.2%"
          position="absolute"
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 2.5,
            repeatType: 'mirror',
          }}
          animate={{ scaleY: [1, 0, 1] }}
        >
          <ComputerEyesSVG maxHeight="100%" maxWidth="100%" />
        </Motion>
        <DiedComputerSVG maxHeight="100%" maxWidth="100%" width="100%" />
      </Box>
      <Typography mb=".5rem" size="large" variant="display" textAlign="center">
        OOPS!
      </Typography>
      <Typography
        mb="1rem"
        mx="auto"
        size="large"
        variant="body"
        maxWidth="30rem"
        textAlign="center"
      >
        {message || 'Something went wrong'}
      </Typography>
      <Button
        mx="auto"
        bg="onSurface"
        variant="filled"
        color="inverseOnSurface"
        onClick={() => push(linkGoTo || '/')}
      >
        Back home!
      </Button>
    </Box>
  );
};

export default Error;

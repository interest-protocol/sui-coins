import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { ComputerEyesSVG, DiedComputerSVG } from '@/svg';

import { ErrorProps } from './error.types';

const Error: FC<ErrorProps> = ({ message, linkGoTo }) => {
  const { push } = useRouter();

  return (
    <Box variant="container">
      <Box
        width="100%"
        color="onSurface"
        gridColumn={['1/-1', '1/-1', '1/-1', '2/12']}
      >
        <Box width={['unset', 'unset', 'unset', '100%']} position="relative">
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
        <Typography variant="displayLarge" mb=".5rem" textAlign="center">
          OOPS!
        </Typography>
        <Typography
          mb="1rem"
          textAlign="center"
          variant="title2"
          fontFamily="Share Tech Mono"
        >
          {message || 'Something went wrong'}
        </Typography>
        <Button
          mx="auto"
          size="small"
          bg="onSurface"
          variant="filled"
          color="inverseOnSurface"
          onClick={() => push(linkGoTo || '/')}
        >
          Back home!
        </Button>
      </Box>
    </Box>
  );
};

export default Error;

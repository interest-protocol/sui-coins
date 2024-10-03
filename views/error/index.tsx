import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Network, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/hooks/use-network';
import { ComputerEyesSVG, DiedComputerSVG } from '@/svg';

import { ErrorProps } from './error.types';

const Error: FC<ErrorProps> = ({ message, linkGoTo }) => {
  const network = useNetwork();
  const { push } = useRouter();

  return (
    <Box variant="container">
      <Box
        pt="4xl"
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
        <Typography
          mb=".5rem"
          size="large"
          variant="display"
          textAlign="center"
        >
          OOPS!
        </Typography>
        <Typography mb="1rem" size="large" textAlign="center" variant="title">
          {message || 'Something went wrong'}
        </Typography>
        <Button
          mx="auto"
          bg="onSurface"
          variant="filled"
          onClick={() =>
            push(
              linkGoTo || network === Network.MAINNET
                ? '/'
                : Routes[RoutesEnum.CreateCoin]
            )
          }
        >
          Back home!
        </Button>
      </Box>
    </Box>
  );
};

export default Error;

import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import {
  FifthCoin,
  FirstCoin,
  FourthCoin,
  SecondCoin,
  ThirdCoin,
} from './illustration-svg';
import { CoinsVariants } from './illustration-variants';

const CoinsIllustration: FC = () => {
  return (
    <Box
      display="flex"
      height="28rem"
      left="5.875rem"
      width="15.875rem"
      position="absolute"
    >
      <Motion
        top="22.4375rem"
        left="6.5625rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <FirstCoin maxHeight="5.5625rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
      <Motion
        left="6.25rem"
        top="16.625rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <SecondCoin maxHeight="4.6875rem" maxWidth="5.75rem" width="100%" />
      </Motion>
      <Motion
        top="9.375rem"
        left="10.3806rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[1]}
      >
        <ThirdCoin maxHeight="5.375rem" maxWidth="3.0625rem" width="100%" />
      </Motion>
      <Motion
        top="8.4375rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[2]}
      >
        <FourthCoin maxHeight="6.0625rem" maxWidth="6rem" width="100%" />
      </Motion>
      <Motion
        top="5.1875rem"
        left="11.5625rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <FifthCoin maxHeight="3.375rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
      <Motion
        top="1.25rem"
        left="4.0338rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[1]}
      >
        <FirstCoin maxHeight="5.5625rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
    </Box>
  );
};

export default CoinsIllustration;

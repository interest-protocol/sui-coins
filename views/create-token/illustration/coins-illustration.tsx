import { Motion } from '@interest-protocol/ui-kit';
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
    <>
      <Motion
        maxWidth={['3.3125rem', '3.3125rem', '3.3125rem', '4.3125rem']}
        width="100%"
        top={['69%', '69%', '69%', '67%']}
        left={['39%', '39%', '39%', '37%']}
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <FirstCoin maxHeight="5.5625rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
      <Motion
        maxWidth={['4.75rem', '4.75rem', '4.75rem', '5.75rem']}
        width="100%"
        left="35%"
        top={['53%', '53%', '53%', '52%']}
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <SecondCoin maxHeight="4.6875rem" maxWidth="5.75rem" width="100%" />
      </Motion>
      <Motion
        maxWidth={['2.0625rem', '2.0625rem', '2.0625rem', '3.0625rem']}
        width="100%"
        top="37%"
        left="49%"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[1]}
      >
        <ThirdCoin maxHeight="5.375rem" maxWidth="3.0625rem" width="100%" />
      </Motion>
      <Motion
        maxWidth={['5rem', '5rem', '5rem', '6rem']}
        width="100%"
        top="32%"
        left="15%"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[2]}
      >
        <FourthCoin maxHeight="6.0625rem" maxWidth="6rem" width="100%" />
      </Motion>
      <Motion
        maxWidth={['3.3125rem', '3.3125rem', '3.3125rem', '4.3125rem']}
        width="100%"
        top="26%"
        left="53%"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[0]}
      >
        <FifthCoin maxHeight="3.375rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
      <Motion
        maxWidth={['3.3125rem', '3.3125rem', '3.3125rem', '4.3125rem']}
        width="100%"
        top="10%"
        left="22%"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={CoinsVariants[1]}
      >
        <FirstCoin maxHeight="5.5625rem" maxWidth="4.3125rem" width="100%" />
      </Motion>
    </>
  );
};

export default CoinsIllustration;

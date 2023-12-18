import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CoinsIllustration from './coins-illustration';
import { Phone, Spheres, Stars } from './illustration-svg';
import {
  PhoneVariants,
  SpheresVariants,
  StarsVariants,
} from './illustration-variants';

const Illustration: FC = () => {
  return (
    <Box
      width="100%"
      position="relative"
      height={['30.75rem', '30.75rem', '30.75rem', '41.5rem']}
    >
      <Motion
        bottom="0"
        width="100%"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={PhoneVariants}
      >
        <Phone maxHeight="24.0625rem" maxWidth="31.75rem" width="100%" />
      </Motion>
      <Motion
        zIndex="0"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={StarsVariants}
        top={['30%', '40%', '33%', '33%']}
        left={['14%', '14%', '19%', '16%']}
        width={['75%', '75%', '100%', '100%']}
      >
        <Stars maxHeight="14.0625rem" maxWidth="22.125rem" width="100%" />
      </Motion>
      <CoinsIllustration />
      <Motion
        animate="animate"
        initial="initial"
        position="absolute"
        variants={SpheresVariants}
        top={['0%', '15%', '12%', '12%']}
        left={['9%', '9%', '14%', '14%']}
        width={['80%', '80%', '100%', '100%']}
      >
        <Spheres maxWidth="21.3125rem" maxHeight="24.6875rem" width="100%" />
      </Motion>
    </Box>
  );
};

export default Illustration;

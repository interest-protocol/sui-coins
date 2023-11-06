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
    <Box scale={[0.7, 0.7, 0.7, 1]} position="relative">
      <Motion
        pt="12.5rem"
        width="100%"
        display="flex"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={PhoneVariants}
      >
        <Phone maxHeight="24.0625rem" maxWidth="31.75rem" width="100%" />
      </Motion>
      <Motion
        zIndex="0"
        width="100%"
        top="8.4375rem"
        left="5.3125rem"
        initial="initial"
        animate="animate"
        position="absolute"
        variants={StarsVariants}
      >
        <Stars maxHeight="14.0625rem" maxWidth="22.125rem" width="100%" />
      </Motion>
      <CoinsIllustration />
      <Motion
        top="0rem"
        width="100%"
        left="4.6875rem"
        animate="animate"
        initial="initial"
        position="absolute"
        variants={SpheresVariants}
      >
        <Spheres maxWidth="21.3125rem" maxHeight="24.6875rem" width="100%" />
      </Motion>
    </Box>
  );
};

export default Illustration;

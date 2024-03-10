import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

const Ball: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 60 60"
    fill="none"
    {...props}
  >
    <circle cx="30" cy="30" r="30" fill="currentColor" />
  </svg>
);

const Illustration: FC = () => (
  <Motion
    gap="m"
    width="11rem"
    height="11rem"
    display="flex"
    position="relative"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    animate={{ rotate: ['0deg', '180deg', '359deg'] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
  >
    <Motion
      animate={{ scale: ['100%', '110%', '90%', '100%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      <Ball maxWidth="6rem" maxHeight="6rem" width="100%" />
    </Motion>
    <Box
      bottom="0"
      width="8rem"
      height="6rem"
      position="absolute"
      backdropFilter="blur(4px)"
      clipPath="polygon(0% 30%, 100% 0%, 100% 100%, 0% 100%)"
    />
  </Motion>
);

export default Illustration;

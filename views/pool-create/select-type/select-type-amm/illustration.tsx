import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

const Block: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <rect width="100" height="100" fill="currentColor" />
  </svg>
);

const Illustration: FC = () => (
  <Box
    gap="m"
    width="11rem"
    height="11rem"
    display="flex"
    position="relative"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <Motion
      animate={{
        y: ['0rem', '-1rem', '1rem', '0rem'],
        scale: ['100%', '110%', '90%', '100%'],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Block maxWidth="6rem" maxHeight="6rem" width="100%" />
    </Motion>
    <Box
      bottom="0"
      width="8rem"
      height="6rem"
      position="absolute"
      backdropFilter="blur(4px)"
      clipPath="polygon(0% 30%, 100% 0%, 100% 100%, 0% 100%)"
    />
  </Box>
);

export default Illustration;

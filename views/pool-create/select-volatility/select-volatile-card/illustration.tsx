import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

const MovingBallSVG: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 153 60"
    fill="none"
    {...props}
  >
    <circle cx="123" cy="30" r="30" fill="currentColor" />
    <rect width="123" height="60" fill="url(#IAYNLQD8T3DJ63GR)" />
    <defs>
      <radialGradient
        id="IAYNLQD8T3DJ63GR"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(0 30) scale(123 75.7516)"
      >
        <stop stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.455621" stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.77" stopColor="currentColor" />
        <stop offset="1" stopColor="currentColor" />
      </radialGradient>
    </defs>
  </svg>
);

const StaticBallSVG: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
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
  <Box
    gap="m"
    width="11rem"
    display="grid"
    position="relative"
    gridTemplateColumns="2rem 2rem 2rem 2rem"
    gridTemplateRows="2rem 2rem 2rem 2rem"
  >
    <Box
      top="1.6rem"
      width="6rem"
      height="2rem"
      left="-0.6rem"
      rotate="-45deg"
      overflow="hidden"
      position="absolute"
      borderRadius="m"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="1.6rem"
      width="6rem"
      height="2rem"
      left="2.4rem"
      rotate="-45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '95%', scaleX: '-1' }}
        animate={{ x: '-80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="4.4rem"
      width="6rem"
      height="2rem"
      left="-0.6rem"
      rotate="45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '95%', scaleX: '-1' }}
        animate={{ x: '-80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="7.4rem"
      width="6rem"
      height="2rem"
      left="-0.6rem"
      rotate="45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '95%', scaleX: '-1' }}
        animate={{ x: '-80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="7.4rem"
      width="6rem"
      left="2.4rem"
      height="2rem"
      rotate="45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="7.4rem"
      width="6rem"
      height="2rem"
      left="5.6rem"
      rotate="-45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <Box
      top="4.4rem"
      width="6rem"
      height="2rem"
      left="5.6rem"
      rotate="-45deg"
      borderRadius="m"
      overflow="hidden"
      position="absolute"
    >
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '80%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
    </Box>
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
    <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
  </Box>
);

export default Illustration;

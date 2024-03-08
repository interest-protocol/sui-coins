import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

const MovingBallSVG: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 303 60"
    fill="none"
    {...props}
  >
    <circle cx="273" cy="30" r="30" fill="currentColor" />
    <rect width="273" height="60" fill="url(#riQTUuoZ3iV9RQEH)" />
    <defs>
      <radialGradient
        id="riQTUuoZ3iV9RQEH"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(0 30) scale(273 207.564)"
      >
        <stop stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.455621" stopColor="currentColor" stopOpacity="0" />
        <stop offset="0.91" stopColor="currentColor" />
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
  <Box display="flex" flexDirection="column" gap="m" width="11rem">
    <Box
      width="100%"
      height="2rem"
      display="flex"
      overflow="hidden"
      position="relative"
      borderRadius="1rem"
      justifyContent="space-between"
    >
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '50%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
    </Box>
    <Box
      width="100%"
      height="2rem"
      display="flex"
      overflow="hidden"
      position="relative"
      borderRadius="1rem"
      justifyContent="space-between"
    >
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '95%', scaleX: '-1' }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
    </Box>
    <Box
      width="100%"
      height="2rem"
      display="flex"
      overflow="hidden"
      position="relative"
      borderRadius="1rem"
      justifyContent="space-between"
    >
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '-95%' }}
        animate={{ x: '50%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
    </Box>
    <Box
      width="100%"
      height="2rem"
      display="flex"
      overflow="hidden"
      position="relative"
      borderRadius="1rem"
      justifyContent="space-between"
    >
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
      <Motion
        top="0"
        height="2rem"
        position="absolute"
        initial={{ x: '95%', scaleX: '-1' }}
        animate={{ x: '-50%' }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <MovingBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Motion>
      <Box>
        <StaticBallSVG maxHeight="2rem" maxWidth="100%" height="100%" />
      </Box>
    </Box>
  </Box>
);

export default Illustration;

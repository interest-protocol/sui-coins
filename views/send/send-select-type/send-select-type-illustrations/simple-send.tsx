import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, useId } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

const Circle: FC<SVGProps> = ({ maxWidth, maxHeight, id, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 104 104"
    fill="none"
    {...props}
  >
    <defs>
      <clipPath id={id}>
        <circle cx="52" cy="52" r="52" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);

const Triangle: FC<SVGProps> = ({ maxWidth, maxHeight, id, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 105 102"
    fill="none"
    {...props}
  >
    <defs>
      <clipPath id={id}>
        <path
          d="M0.953969 0.735699L104.273 19.5219L29.6865 101.741L0.953969 0.735699Z"
          fill="currentColor"
        />
      </clipPath>
    </defs>
  </svg>
);

const Square: FC<SVGProps> = ({ maxWidth, maxHeight, id, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 115 114"
    fill="none"
    {...props}
  >
    <defs>
      <clipPath id={id}>
        <rect
          x="26"
          width="92"
          height="92"
          transform="rotate(16 26 0)"
          fill="currentColor"
        />
      </clipPath>
    </defs>
  </svg>
);

const SimpleSendIllustration: FC = () => {
  const squareId = useId();
  const circleId = useId();
  const triangleId = useId();

  return (
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
        top="1rem"
        scale="0.9"
        right="0rem"
        bg="#0053DBDD"
        overflow="visible"
        position="absolute"
        backdropFilter="blur(10px)"
        clipPath={`url(#${squareId})`}
        animate={{ y: ['0rem', '-1rem', '1rem', '0rem'] }}
        transition={{
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 2 * Math.random() + 4,
        }}
      >
        <Square
          id={squareId}
          maxWidth="7.5rem"
          maxHeight="7.5rem"
          width="100%"
        />
      </Motion>
      <Motion
        top="1rem"
        left="0rem"
        scale="0.9"
        bg="#0053DB88"
        position="absolute"
        backdropFilter="blur(10px)"
        clipPath={`url(#${circleId})`}
        animate={{ y: ['0rem', '-1rem', '1rem', '0rem'] }}
        transition={{
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 2 * Math.random() + 4,
        }}
      >
        <Circle
          id={circleId}
          maxWidth="7.5rem"
          maxHeight="7.5rem"
          width="100%"
        />
      </Motion>
      <Motion
        bottom="0"
        scale="0.9"
        bg="#0053DB44"
        position="absolute"
        backdropFilter="blur(15px) "
        clipPath={`url(#${triangleId})`}
        filter="drop-shadow(0 0 0.75 crimson)"
        animate={{ y: ['0rem', '-1rem', '1rem', '0rem'] }}
        transition={{
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 2 * Math.random() + 4,
        }}
      >
        <Triangle
          width="100%"
          id={triangleId}
          maxWidth="7rem"
          maxHeight="7rem"
        />
      </Motion>
    </Box>
  );
};

export default SimpleSendIllustration;

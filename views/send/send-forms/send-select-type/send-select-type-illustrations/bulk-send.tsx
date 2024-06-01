import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SVGProps } from '@/components/svg/svg.types';

const Disk: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 150 47"
    fill="none"
    {...props}
  >
    <ellipse cx="75" cy="23.5" rx="75" ry="23.5" fill="currentColor" />
  </svg>
);

const BulkSendIllustration: FC = () => (
  <Box
    width="11rem"
    height="11rem"
    display="flex"
    position="relative"
    alignItems="center"
    flexDirection="column"
    justifyContent="flex-end"
  >
    {Array.from({ length: 5 }, (_, index) => (
      <Motion
        key={v4()}
        position="absolute"
        top={`${index * 1.5 + 2}rem`}
        opacity={`${100 - (1 + index) * 18}%`}
        animate={{ y: ['0rem', '-1.5rem', '0rem'] }}
        transition={{
          delay: index / 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: index / 2,
          duration: 4 - index / 2,
        }}
      >
        <Disk maxWidth="8rem" maxHeight="8rem" width="100%" />
      </Motion>
    ))}
  </Box>
);

export default BulkSendIllustration;

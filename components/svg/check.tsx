import { FC } from 'react';

import { SVGProps } from './svg.types';

const Check: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 140 140"
    fill="none"
    {...props}
  >
    <path
      d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
      fill="#BAF6CF"
    />
    <path
      d="M2 70C2 32.4446 32.4446 2 70 2C107.555 2 138 32.4446 138 70C138 107.555 107.555 138 70 138C32.4446 138 2 107.555 2 70Z"
      stroke="white"
      strokeOpacity="0.72"
      strokeWidth="4"
    />
    <path
      d="M97.4582 52.5L61.2501 88.7081L42.542 70L46.6668 65.8752L61.2501 80.4585L93.3335 48.3752L97.4582 52.5Z"
      fill="#16A24A"
    />
  </svg>
);

export default Check;

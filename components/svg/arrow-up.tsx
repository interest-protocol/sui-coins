import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowUp: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M3.43945 11.25L9.00011 5.68933L14.5608 11.25L13.5001 12.3107L9.00011 7.81065L4.50011 12.3107L3.43945 11.25Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowUp;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowDown: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M8.99999 12.3107L14.5607 6.74999L13.5 5.68933L8.99999 10.1893L4.49999 5.68933L3.43933 6.74999L8.99999 12.3107Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowDown;

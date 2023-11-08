import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowTopRight: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M5.25011 4.5H13.5001V12.75H12.0001V7.06066L5.25011 13.8107L4.18945 12.75L10.9395 6H5.25011V4.5Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowTopRight;

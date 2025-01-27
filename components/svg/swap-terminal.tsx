import { FC } from 'react';

import { SVGProps } from './svg.types';

const SwapTerminal: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_2715_15012)">
      <path
        d="M5.0332 14.8284L6.44741 16.2426L10.6901 12L6.44741 7.75732L5.0332 9.17154L7.86162 12L5.0332 14.8284Z"
        fill="currentColor"
      />
      <path d="M15 14H11V16H15V14Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM22 4H2V20H22V4Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_2715_15012">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SwapTerminal;

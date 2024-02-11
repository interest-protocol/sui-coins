import { FC } from 'react';

import { SVGProps } from './svg.types';

const SOL: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 398 312"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_858_142)">
      <path
        d="M64.5999 237.9C66.9999 235.5 70.2999 234.1 73.7999 234.1H391.2C397 234.1 399.9 241.1 395.8 245.2L333.1 307.9C330.7 310.3 327.4 311.7 323.9 311.7H6.49989C0.699894 311.7 -2.20011 304.7 1.89989 300.6L64.5999 237.9Z"
        fill="currentColor"
      />
      <path
        d="M64.5999 3.8C67.0999 1.4 70.3999 0 73.7999 0H391.2C397 0 399.9 7 395.8 11.1L333.1 73.8C330.7 76.2 327.4 77.6 323.9 77.6H6.49989C0.699894 77.6 -2.20011 70.6 1.89989 66.5L64.5999 3.8Z"
        fill="currentColor"
      />
      <path
        d="M333.1 120.101C330.7 117.701 327.4 116.301 323.9 116.301H6.49989C0.699894 116.301 -2.20011 123.301 1.89989 127.401L64.5999 190.101C66.9999 192.501 70.2999 193.901 73.7999 193.901H391.2C397 193.901 399.9 186.901 395.8 182.801L333.1 120.101Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_858_142">
        <rect width="397.7" height="311.7" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SOL;

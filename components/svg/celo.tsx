import { FC } from 'react';

import { SVGProps } from './svg.types';

const CELO: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_3198_71800)">
      <mask
        id="mask0_3198_71800"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="22"
        height="22"
      >
        <path d="M22 0H0V22H22V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_3198_71800)">
        <path
          d="M22 0H0V22H21.9994V14.3207H18.3486C17.0901 17.1221 14.2571 19.0734 11.0153 19.0734C6.54586 19.0734 2.92655 15.423 2.92655 10.9845C2.92655 6.54598 6.54586 2.92721 11.0153 2.92721C14.3197 2.92721 17.1527 4.94169 18.4117 7.80572H22V0Z"
          fill="currentColor"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_3198_71800">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CELO;

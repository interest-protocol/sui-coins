import { FC } from 'react';

import { SVGProps } from './svg.types';

const DefaultToken: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_597_1987)">
      <rect width="40" height="40" fill="black" fillOpacity="0.08" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0002 24.4441C22.4548 24.4441 24.4446 22.4543 24.4446 19.9997C24.4446 17.5451 22.4548 15.5552 20.0002 15.5552C17.5456 15.5552 15.5557 17.5451 15.5557 19.9997C15.5557 22.4543 17.5456 24.4441 20.0002 24.4441ZM26.6668 19.9997C26.6668 23.6816 23.6821 26.6663 20.0002 26.6663C16.3183 26.6663 13.3335 23.6816 13.3335 19.9997C13.3335 16.3178 16.3183 13.333 20.0002 13.333C23.6821 13.333 26.6668 16.3178 26.6668 19.9997Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_597_1987">
        <rect width="40" height="40" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default DefaultToken;

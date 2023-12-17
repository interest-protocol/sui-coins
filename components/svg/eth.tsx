import { FC } from 'react';

import { SVGProps } from './svg.types';

const ETH: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 13 21"
    fill="none"
    {...props}
  >
    <path
      d="M6.28318 0L6.15283 0.443039V13.299L6.28318 13.4291L12.2508 9.90169L6.28318 0Z"
      fill="currentColor"
    />
    <path
      d="M6.28303 0L0.31543 9.90169L6.28303 13.4292V7.18927V0Z"
      fill="currentColor"
    />
    <path
      d="M6.28292 15.3704L6.20947 15.4599V20.0395L6.28292 20.254L12.2541 11.8447L6.28292 15.3704Z"
      fill="currentColor"
    />
    <path
      d="M6.28303 20.2541V15.3704L0.31543 11.8447L6.28303 20.2541Z"
      fill="currentColor"
    />
    <path
      d="M6.28271 13.4293L12.2502 9.90188L6.28271 7.18945V13.4293Z"
      fill="currentColor"
    />
    <path
      d="M0.31543 9.90188L6.28293 13.4293V7.18945L0.31543 9.90188Z"
      fill="currentColor"
    />
  </svg>
);

export default ETH;

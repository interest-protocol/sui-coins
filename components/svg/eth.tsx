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
      d="M6.78269 0L6.65234 0.443039V13.299L6.78269 13.4291L12.7503 9.90169L6.78269 0Z"
      fill="currentColor"
    />
    <path
      d="M6.78205 0L0.814453 9.90169L6.78205 13.4292V7.18927V0Z"
      fill="currentColor"
    />
    <path
      d="M6.78244 15.3704L6.70898 15.4599V20.0395L6.78244 20.254L12.7536 11.8447L6.78244 15.3704Z"
      fill="currentColor"
    />
    <path
      d="M6.78205 20.2541V15.3704L0.814453 11.8447L6.78205 20.2541Z"
      fill="currentColor"
    />
    <path
      d="M6.78125 13.4293L12.7488 9.90188L6.78125 7.18945V13.4293Z"
      fill="currentColor"
    />
    <path
      d="M0.814453 9.90188L6.78196 13.4293V7.18945L0.814453 9.90188Z"
      fill="currentColor"
    />
  </svg>
);

export default ETH;

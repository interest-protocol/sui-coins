import { FC } from 'react';

import { SVGProps } from './svg.types';

const Pen: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1372_16743)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1095 3.33327L13.1667 0.390465L10.8333 2.72383L13.7761 5.66664L16.1095 3.33327ZM12.8333 6.60945L9.89051 3.66664L1.16669 12.3905V15.3333H4.10949L12.8333 6.60945Z"
        fill="#1B1B1F"
      />
    </g>
    <defs>
      <clipPath id="clip0_1372_16743">
        <rect width="16" height="16" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default Pen;

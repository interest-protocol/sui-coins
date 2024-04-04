import { FC } from 'react';

import { SVGProps } from './svg.types';

const Info: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 19 4"
    fill="none"
    {...props}
  >
    <path d="M0.5 0H4.5V4H0.5V0Z" fill="currentColor" />
    <path d="M7.5 0H11.5V4H7.5V0Z" fill="currentColor" />
    <path d="M14.5 0H18.5V4H14.5V0Z" fill="currentColor" />
  </svg>
);

export default Info;

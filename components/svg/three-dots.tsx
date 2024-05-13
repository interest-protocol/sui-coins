import { FC } from 'react';

import { SVGProps } from './svg.types';

const ThreeDots: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 4 14"
    fill="none"
    {...props}
  >
    <path d="M0.5 13.75V10.75H3.5V13.75H0.5Z" fill="currentColor" />
    <path d="M0.5 8.5V5.5H3.5V8.5H0.5Z" fill="currentColor" />
    <path d="M0.5 3.25V0.25H3.5V3.25H0.5Z" fill="currentColor" />
  </svg>
);

export default ThreeDots;

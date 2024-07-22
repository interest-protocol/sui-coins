import { FC } from 'react';

import { SVGProps } from './svg.types';

const Hourglass: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 20"
    fill="none"
    {...props}
  >
    <path d="M1 14L7 10L13 14V19H1V14Z" stroke="currentColor" strokeWidth="2" />
    <path d="M1 6V1H13V6L7 10L1 6Z" stroke="currentColor" strokeWidth="2" />
    <path d="M3 16H11" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default Hourglass;

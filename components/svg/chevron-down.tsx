import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronDown: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M9.00011 12.3108L14.5608 6.75011L13.5001 5.68945L9.00011 10.1895L4.50011 5.68945L3.43945 6.75011L9.00011 12.3108Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronDown;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronRight: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 10 16"
    fill="none"
    {...props}
  >
    <path
      d="M8.00015 0.585938L0.585938 8.00015L8.00015 15.4144L9.41436 14.0002L3.41436 8.00015L9.41436 2.00015L8.00015 0.585938Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronRight;

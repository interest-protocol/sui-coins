import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronRight: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M9 4.58594L16.4142 12.0002L9 19.4144L7.58578 18.0002L13.5858 12.0002L7.58578 6.00015L9 4.58594Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronRight;

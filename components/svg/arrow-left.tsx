import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowLeft: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M11 4.58594L3.58578 12.0002L11 19.4144L12.4142 18.0002L7.41421 13.0002H20V11.0002H7.41421L12.4142 6.00015L11 4.58594Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowLeft;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const ArrowObliqueSVG: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7.00015 6H18.0002V17H16.0002V9.41421L7.00015 18.4142L5.58594 17L14.5859 8H7.00015V6Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowObliqueSVG;

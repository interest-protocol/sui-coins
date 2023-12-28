import { FC } from 'react';

import { SVGProps } from './svg.types';

const DoubleChevron: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 13"
    fill="none"
    {...props}
  >
    <path
      d="M20 1.41421L15 6.41421L20 11.4142L18.5858 12.8284L12.1716 6.41421L18.5858 1.19209e-07L20 1.41421Z"
      fill="currentColor"
    />
    <path
      d="M1.41421 0L7.82843 6.41421L1.41421 12.8284L0 11.4142L5 6.41421L0 1.41421L1.41421 0Z"
      fill="currentColor"
    />
  </svg>
);

export default DoubleChevron;

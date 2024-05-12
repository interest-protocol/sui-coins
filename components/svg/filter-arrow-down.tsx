import { FC } from 'react';

import { SVGProps } from './svg.types';

const FilterArrowDown: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 7 4" fill="none" {...props}>
    <path
      d="M0.166504 0.666672L3.49984 4.00001L6.83317 0.666672H0.166504Z"
      fill="currentColor"
    />
  </svg>
);
export default FilterArrowDown;

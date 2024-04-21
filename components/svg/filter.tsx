import { FC } from 'react';

import { SVGProps } from './svg.types';

const Filter: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M2 7H22V9H2V7Z" fill="currentColor" />
    <path d="M5 11H19V13H5V11Z" fill="currentColor" />
    <path d="M8 15H16V17H8V15Z" fill="currentColor" />
  </svg>
);

export default Filter;

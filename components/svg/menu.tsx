import { FC } from 'react';

import { SVGProps } from './svg.types';

const Menu: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M2 5H22V7H2V5Z" fill="currentColor" />
    <path d="M2 11H22V13H2V11Z" fill="currentColor" />
    <path d="M2 17H22V19H2V17Z" fill="currentColor" />
  </svg>
);

export default Menu;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const Minus: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M3.3335 9.16699H16.6668V10.8337H3.3335V9.16699Z"
      fill="currentColor"
    />
  </svg>
);

export default Minus;

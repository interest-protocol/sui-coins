import { FC } from 'react';

import { SVGProps } from './svg.types';

const Check: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 56 41"
    fill="none"
    {...props}
  >
    <path
      d="M55.4592 4.49979L19.2511 40.7079L0.542969 21.9998L4.66776 17.875L19.2511 32.4583L51.3344 0.375L55.4592 4.49979Z"
      fill="currentColor"
    />
  </svg>
);

export default Check;

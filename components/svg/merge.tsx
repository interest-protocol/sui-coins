import { FC } from 'react';

import { SVGProps } from './svg.types';

const Merge: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.08579 8.00008L2.79289 6.70718L4.20711 5.29297L7.91421 9.00008L4.20711 12.7072L2.79289 11.293L4.08579 10.0001H0V8.00008H4.08579Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9142 9.99992L15.2071 11.2928L13.7929 12.707L10.0858 8.99992L13.7929 5.29282L15.2071 6.70703L13.9142 7.99992L18 7.99992V9.99992H13.9142Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H18V6H16V2H2V6H0V0Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 18L0 18L5.24537e-07 12L2 12L2 16L16 16V12H18V18Z"
      fill="currentColor"
    />
  </svg>
);

export default Merge;

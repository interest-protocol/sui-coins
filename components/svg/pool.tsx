import { FC } from 'react';

import { SVGProps } from './svg.types';

const Pool: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5.35078V0H8V4.64922L4.51938 9H0V11H5.48062L10 5.35078ZM8 12.6492V18H10V13.3508L13.4806 9H18L18 7L12.5194 7L8 12.6492Z"
      fill="currentColor"
    />
  </svg>
);

export default Pool;

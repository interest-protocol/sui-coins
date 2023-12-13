import { FC } from 'react';

import { SVGProps } from './svg.types';

const File: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 21"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.5H10.146L16 6.48708V20.5H0V0.5ZM2 2.5V18.5H14V7.5H9V2.5H2ZM11 3.5L13 5.5H11V3.5Z"
      fill="currentColor"
    />
  </svg>
);

export default File;

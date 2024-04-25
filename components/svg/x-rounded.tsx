import { FC } from 'react';

import { SVGProps } from './svg.types';

const XRounded: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.16669 8C1.16669 3.94991 4.44993 0.666666 8.50002 0.666666C12.5501 0.666666 15.8334 3.94991 15.8334 8C15.8334 12.0501 12.5501 15.3333 8.50002 15.3333C4.44993 15.3333 1.16669 12.0501 1.16669 8Z"
      fill="#E53E3E"
    />
    <path
      d="M6.68765 5.33333L8.49998 7.14566L10.3123 5.33333L11.1666 6.18767L9.35432 8L11.1666 9.81233L10.3123 10.6667L8.49998 8.85434L6.68765 10.6667L5.83331 9.81233L7.64564 8L5.83331 6.18767L6.68765 5.33333Z"
      fill="white"
    />
  </svg>
);

export default XRounded;

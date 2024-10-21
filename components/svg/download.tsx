import { FC } from 'react';

import { SVGProps } from './svg.types';

const Download: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M6.99998 10.334L2.83331 6.16732L3.99998 4.95898L6.16665 7.12565V0.333984H7.83331V7.12565L9.99998 4.95898L11.1666 6.16732L6.99998 10.334ZM1.99998 13.6673C1.54165 13.6673 1.14929 13.5041 0.822896 13.1777C0.496507 12.8513 0.333313 12.459 0.333313 12.0007V9.50065H1.99998V12.0007H12V9.50065H13.6666V12.0007C13.6666 12.459 13.5035 12.8513 13.1771 13.1777C12.8507 13.5041 12.4583 13.6673 12 13.6673H1.99998Z"
      fill="currentColor"
    />
  </svg>
);

export default Download;

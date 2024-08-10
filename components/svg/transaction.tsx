import { FC } from 'react';

import { SVGProps } from './svg.types';

const Transaction: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 28 26"
    fill="none"
    {...props}
  >
    <path
      d="M26 9C27.1046 9 28 8.10457 28 7C28 5.89543 27.1046 5 26 5C24.8954 5 24 5.89543 24 7C24 8.10457 24.8954 9 26 9Z"
      fill="currentColor"
    />
    <path
      d="M16 26H9V24H16C20.963 24 25 19.963 25 15V11H27V15C27 21.065 22.065 26 16 26Z"
      fill="currentColor"
    />
    <path
      d="M14 18C11.243 18 9 15.757 9 13C9 10.243 11.243 8 14 8C16.757 8 19 10.243 19 13C19 15.757 16.757 18 14 18ZM14 10C12.346 10 11 11.346 11 13C11 14.654 12.346 16 14 16C15.654 16 17 14.654 17 13C17 11.346 15.654 10 14 10Z"
      fill="currentColor"
    />
    <path
      d="M2 21C3.10457 21 4 20.1046 4 19C4 17.8954 3.10457 17 2 17C0.89543 17 0 17.8954 0 19C0 20.1046 0.89543 21 2 21Z"
      fill="currentColor"
    />
    <path
      d="M3 15H1V11C1 4.935 5.935 0 12 0H19V2H12C7.037 2 3 6.037 3 11V15Z"
      fill="currentColor"
    />
  </svg>
);

export default Transaction;

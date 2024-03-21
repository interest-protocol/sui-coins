import { FC } from 'react';

import { SVGProps } from './svg.types';

const Wallet: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23 3H1V21H23V15V9V3ZM21 9V5H3V19H21V15H17V9H21ZM21 13V11H19V13H21Z"
      fill="currentColor"
    />
  </svg>
);

export default Wallet;

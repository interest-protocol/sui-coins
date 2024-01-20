import { FC } from 'react';

import { SVGProps } from './svg.types';

const Nft: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0.856049L22 6.4116V17.5884L12 23.144L2 17.5884V6.4116L12 0.856049ZM4 7.58841V16.4116L12 20.856L20 16.4116V7.58841L12 3.14397L4 7.58841Z"
      fill="currentColor"
    />
  </svg>
);

export default Nft;

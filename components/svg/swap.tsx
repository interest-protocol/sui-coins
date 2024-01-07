import { FC } from 'react';

import { SVGProps } from './svg.types';

const Swap: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxHeight, maxWidth }} viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 22L9.5 2H7.5L3 6.5L4.5 8L7.5 5L7.5 22H9.5ZM14 2V22H16L20.5 17.5L19 16L16 19V2H14Z"
      fill="currentColor"
    />
  </svg>
);

export default Swap;

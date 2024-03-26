import { FC } from 'react';

import { SVGProps } from './svg.types';

const Send: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H7V2H2V16H16V11H18V18H0V0ZM14.5859 2H11V0H18V7H16V3.41436L9.70718 9.70718L8.29297 8.29297L14.5859 2Z"
      fill="currentColor"
    />
  </svg>
);

export default Send;

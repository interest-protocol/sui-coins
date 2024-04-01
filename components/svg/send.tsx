import { FC } from 'react';

import { SVGProps } from './svg.types';

const Send: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <path
      d="M7 4H2C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V15C1 15.2652 1.10536 15.5196 1.29289 15.7071C1.48043 15.8946 1.73478 16 2 16H12C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V10M7 10L14.5 2.5M10 1H16V7"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Send;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const Refresh: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M12 3C7.02944 3 3 7.02944 3 12V13H1V12C1 5.92487 5.92487 1 12 1C15.7216 1 19.01 2.84804 21 5.67419V2H23V9H16V7H19.4847C17.8694 4.58695 15.1193 3 12 3Z"
      fill="currentColor"
    />
    <path
      d="M22.9999 11V12C22.9999 18.0751 18.0751 23 11.9999 23C8.27841 23 4.99001 21.152 3 18.3259V22H1V15H8V17H4.51525C6.1305 19.413 8.88069 21 11.9999 21C16.9705 21 20.9999 16.9706 20.9999 12V11H22.9999Z"
      fill="currentColor"
    />
  </svg>
);

export default Refresh;

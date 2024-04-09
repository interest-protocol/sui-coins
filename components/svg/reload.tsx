import { FC } from 'react';

import { SVGProps } from './svg.types';

const Reload: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      d="M12.5 3C7.52944 3 3.5 7.02944 3.5 12V13H1.5V12C1.5 5.92487 6.42487 1 12.5 1C16.2216 1 19.51 2.84804 21.5 5.67419V2H23.5V9H16.5V7H19.9847C18.3694 4.58695 15.6193 3 12.5 3Z"
      fill="currentColor"
    />
    <path
      d="M23.4999 11V12C23.4999 18.0751 18.5751 23 12.4999 23C8.77841 23 5.49001 21.152 3.5 18.3259V22H1.5V15H8.5V17H5.01525C6.6305 19.413 9.38069 21 12.4999 21C17.4705 21 21.4999 16.9706 21.4999 12V11H23.4999Z"
      fill="currentColor"
    />
  </svg>
);

export default Reload;

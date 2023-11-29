import { FC } from 'react';

import { SVGProps } from './svg.types';

const Clock: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 21 20"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.3364 10.0003C17.3364 13.6822 14.3517 16.667 10.6698 16.667C6.98786 16.667 4.00309 13.6822 4.00309 10.0003C4.00309 6.31843 6.98786 3.33366 10.6698 3.33366C14.3517 3.33366 17.3364 6.31843 17.3364 10.0003ZM19.0031 10.0003C19.0031 14.6027 15.2721 18.3337 10.6698 18.3337C6.06739 18.3337 2.33643 14.6027 2.33643 10.0003C2.33643 5.39795 6.06739 1.66699 10.6698 1.66699C15.2721 1.66699 19.0031 5.39795 19.0031 10.0003ZM11.5031 9.65515V5.83366H9.83643V10.3455L12.1638 12.6729L13.3423 11.4944L11.5031 9.65515Z"
      fill="currentColor"
    />
  </svg>
);

export default Clock;

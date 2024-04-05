import { FC } from 'react';

import { SVGProps } from './svg.types';

const EmptyBox: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 18"
    fill="none"
    {...props}
  >
    <path
      d="M3.5 6.5L10.5 2.5L16.492 5.924C16.7983 6.09894 17.0528 6.35175 17.2298 6.65681C17.4069 6.96186 17.5001 7.3083 17.5 7.661V12.339C17.5001 12.6917 17.4069 13.0381 17.2298 13.3432C17.0528 13.6482 16.7983 13.9011 16.492 14.076L11.492 16.933C11.1899 17.1056 10.8479 17.1964 10.5 17.1964C10.1521 17.1964 9.81013 17.1056 9.508 16.933L4.508 14.076C4.20174 13.9011 3.9472 13.6482 3.77017 13.3432C3.59315 13.0381 3.49994 12.6917 3.5 12.339V9.537"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.55176 9.99C9.84312 10.1468 10.1689 10.229 10.4998 10.229C10.8307 10.229 11.1564 10.1468 11.4478 9.99L16.9998 7M10.4998 10.5V17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 6.5L10.5 10.5L7.5 11.5L0.5 7.5L3.5 6.5ZM10.5 2.5L17.5 6.5L19.5 4.5L12.5 0.5L10.5 2.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmptyBox;

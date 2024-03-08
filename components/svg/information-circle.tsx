import { FC } from 'react';

import { SVGProps } from './svg.types';

const InformationCircle: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M7.33366 3.99984H8.67366V5.33317H7.33366V3.99984Z"
      fill="currentColor"
    />
    <path
      d="M8.66699 6.6665V11.9998H7.33366V6.6665H8.66699Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666992 7.99984C0.666992 3.94975 3.95024 0.666504 8.00033 0.666504C12.0504 0.666504 15.3337 3.94975 15.3337 7.99984C15.3337 12.0499 12.0504 15.3332 8.00033 15.3332C3.95024 15.3332 0.666992 12.0499 0.666992 7.99984ZM8.00033 1.99984C4.68662 1.99984 2.00033 4.68613 2.00033 7.99984C2.00033 11.3135 4.68662 13.9998 8.00033 13.9998C11.314 13.9998 14.0003 11.3135 14.0003 7.99984C14.0003 4.68613 11.314 1.99984 8.00033 1.99984Z"
      fill="currentColor"
    />
  </svg>
);

export default InformationCircle;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const Times: FC<SVGProps & { filled?: boolean }> = ({
  maxWidth,
  maxHeight,
  filled,
  ...props
}) =>
  filled ? (
    <svg style={{ maxWidth, maxHeight }} viewBox="0 0 24 24" fill="none">
      <path
        d="M6.00015 4.58594L12.0002 10.5859L18.0002 4.58594L19.4144 6.00015L13.4144 12.0002L19.4144 18.0002L18.0002 19.4144L12.0002 13.4144L6.00015 19.4144L4.58594 18.0002L10.5859 12.0002L4.58594 6.00015L6.00015 4.58594Z"
        fill="black"
      />
    </svg>
  ) : (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M14.75 1.25L1.25 14.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M14.75 14.75L1.25 1.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );

export default Times;

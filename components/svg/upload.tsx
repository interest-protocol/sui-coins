import { FC } from 'react';

import { SVGProps } from './svg.types';

const Upload: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 19 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0302 1.53217C9.73731 1.23928 9.26243 1.23928 8.96954 1.53217L3.37671 7.125L4.43737 8.18566L8.74994 3.87309V13.5H10.2499V3.87323L14.5624 8.18566L15.623 7.125L10.0302 1.53217Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 15L16.25 15V16.5L2.75 16.5L2.75 15Z"
      fill="currentColor"
    />
  </svg>
);

export default Upload;

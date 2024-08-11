import { FC } from 'react';

import { SVGProps } from './svg.types';

const ThreeDots: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <path d="M7.25 6.25V13H5.75V6.25H7.25Z" fill="currentColor" />
    <path d="M10.25 6.25V13H8.75V6.25H10.25Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.45943 0.25H11.5406L12.2906 2.5H15.5V4H14V16.75H2V4H0.5V2.5H3.70943L4.45943 0.25ZM5.29057 2.5H10.7094L10.4594 1.75H5.54057L5.29057 2.5ZM3.5 4V15.25H12.5V4H3.5Z"
      fill="currentColor"
    />
  </svg>
);

export default ThreeDots;

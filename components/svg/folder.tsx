import { FC } from 'react';

import { SVGProps } from './svg.types';

const Folder: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H7L10 2H20V16H0V0ZM2 2V14H18V4H10L7 2H2Z"
      fill="#0053DB"
    />
  </svg>
);

export default Folder;

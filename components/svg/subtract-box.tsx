import { FC } from 'react';

import { SVGProps } from './svg.types';

const SubtractBox: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666504 0H15.3332L15.3332 4H11.3332V8H15.3332L15.3332 12H0.666504V0ZM12.6665 6.66667V5.33333H13.9998V6.66667H12.6665Z"
      fill="currentColor"
    />
  </svg>
);

export default SubtractBox;

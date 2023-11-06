import { FC } from 'react';

import { SVGProps } from './svg.types';

const Clipboard: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.93182 2.25H15.75V12.0682H12.0682V15.75H2.25V5.93182H5.93182V2.25ZM6 7.5H3.75V14.25H10.5V12H6V7.5ZM7.5 3.75V10.5H14.25V3.75H7.5Z"
      fill="currentColor"
    />
  </svg>
);

export default Clipboard;

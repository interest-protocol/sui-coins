import { FC } from 'react';

import { SVGProps } from './svg.types';

const SignOut: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path d="M2 2H13V4H4V20H13V22H2V2Z" fill="currentColor" />
    <path
      d="M17 6.58579L22.4142 12L17 17.4142L15.5858 16L18.5858 13H7V11H18.5858L15.5858 8L17 6.58579Z"
      fill="currentColor"
    />
  </svg>
);

export default SignOut;

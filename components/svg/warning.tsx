import { FC } from 'react';

import { SVGProps } from './svg.types';

const Warning: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 64 61"
    fill="none"
    {...props}
  >
    <path
      d="M34.9155 19.3333V36.8333H29.0821V19.3333H34.9155Z"
      fill="currentColor"
    />
    <path
      d="M29.0821 42.6667H34.9446V48.5H29.0821V42.6667Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.4177 0.474713L34.5798 0.474609L63.7465 55.8916L61.1655 60.1667H2.83498L0.253906 55.8917L29.4177 0.474713ZM31.9989 8.09565L7.6658 54.3333H56.3344L31.9989 8.09565Z"
      fill="currentColor"
    />
  </svg>
);

export default Warning;

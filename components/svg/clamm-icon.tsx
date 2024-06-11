import { FC } from 'react';

import { SVGProps } from './svg.types';

const ClammIcon: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 3L9.5 9H2.5L6 3Z"
      fill={props?.fill || '#0053DB'}
    />
  </svg>
);

export default ClammIcon;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const AmmIcon: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      d="M6 2.5L9.3287 4.91844L8.05725 8.83156H3.94275L2.6713 4.91844L6 2.5Z"
      fill={props?.fill || '#D87706'}
    />
  </svg>
);

export default AmmIcon;

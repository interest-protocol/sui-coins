import { FC } from 'react';

import { SVGProps } from './svg.types';

const VolatileIcon: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <rect x="3" y="3" width="6" height="6" fill={props?.fill || '#E34343'} />
  </svg>
);

export default VolatileIcon;

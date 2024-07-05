import { FC } from 'react';

import { SVGProps } from './svg.types';

const Swap: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 18 17"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7073 0.292893C13.3167 -0.0976311 12.6836 -0.0976311 12.293 0.292893L8.58594 4L10.0002 5.41421L12.0002 3.41412V16H14.0002V3.41431L16.0002 5.41421L17.4144 4L13.7073 0.292893ZM6.00024 13.5857V1H4.00024V13.5859L2.00015 11.5858L0.585938 13L4.29304 16.7071C4.68357 17.0977 5.31673 17.0977 5.70726 16.7071L9.41436 13L8.00015 11.5858L6.00024 13.5857Z"
      fill="currentColor"
    />
  </svg>
);

export default Swap;

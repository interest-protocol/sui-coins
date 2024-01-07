import { FC } from 'react';

import { SVGProps } from './svg.types';

const StatsArrowUp: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 23 13"
    fill="none"
    {...props}
  >
    <path
      d="M2.00015 12.4142L9.00015 5.41421L14.0002 10.4142L21.0002 3.41421V9H23.0002V0H14.0002V2H19.5859L14.0002 7.58579L9.00015 2.58579L0.585938 11L2.00015 12.4142Z"
      fill="currentColor"
    />
  </svg>
);

export default StatsArrowUp;

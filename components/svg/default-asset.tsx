import { FC } from 'react';

import { SVGProps } from './svg.types';

const DefaultAsset: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 15 16"
    fill="none"
    {...props}
  >
    <path
      d="M7.50019 0.222229L14.2359 4.11112V11.8889L7.50019 15.7778L0.764437 11.8889V4.11112L7.50019 0.222229Z"
      fill="currentColor"
    />
  </svg>
);

export default DefaultAsset;

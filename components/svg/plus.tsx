import { FC } from 'react';

import { SVGProps } from './svg.types';

const Plus: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M10.8335 3.33301V9.16634H16.6668V10.833H10.8335V16.6663H9.16683V10.833H3.3335V9.16634H9.16683V3.33301H10.8335Z"
      fill="currentColor"
    />
  </svg>
);

export default Plus;

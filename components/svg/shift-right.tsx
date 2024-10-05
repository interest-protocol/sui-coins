import { FC } from 'react';

import { SVGProps } from './svg.types';

const ShiftRight: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 26 26"
    fill="none"
    {...props}
  >
    <mask x="0" y="0" width="26" height="26">
      <rect
        x="13"
        width="18"
        height="18"
        transform="rotate(45 13 0)"
        fill="currentColor"
      />
    </mask>
    <g>
      <path
        d="M9.28769 16.4403L14.0607 11.6673L9.28769 6.89432L10.3483 5.83366L16.182 11.6673L10.3483 17.5009L9.28769 16.4403ZM14.591 16.4403L19.364 11.6673L14.591 6.89432L15.6517 5.83366L21.4853 11.6673L15.6517 17.5009L14.591 16.4403Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default ShiftRight;

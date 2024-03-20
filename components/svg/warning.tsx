import { FC } from 'react';

import { SVGProps } from './svg.types';

const Warning: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 140 140"
    fill="none"
    {...props}
  >
    <path
      d="M0 70C0 31.3401 31.3401 0 70 0C108.66 0 140 31.3401 140 70C140 108.66 108.66 140 70 140C31.3401 140 0 108.66 0 70Z"
      fill="#FED7D7"
    />
    <path
      d="M2 70C2 32.4446 32.4446 2 70 2C107.555 2 138 32.4446 138 70C138 107.555 107.555 138 70 138C32.4446 138 2 107.555 2 70Z"
      stroke="white"
      strokeOpacity="0.72"
      strokeWidth="4"
    />
    <path
      d="M72.9164 58.3336V75.8336H67.0831V58.3336H72.9164Z"
      fill="#E53E3E"
    />
    <path d="M67.0831 81.667H72.9456V87.5003H67.0831V81.667Z" fill="#E53E3E" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M67.4187 39.475L72.5808 39.4749L101.747 94.8919L99.1664 99.167H40.836L38.2549 94.892L67.4187 39.475ZM69.9999 47.096L45.6668 93.3336H94.3354L69.9999 47.096Z"
      fill="#E53E3E"
    />
  </svg>
);

export default Warning;

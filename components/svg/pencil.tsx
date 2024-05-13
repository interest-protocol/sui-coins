import { FC } from 'react';

import { SVGProps } from './svg.types';

const Pencil: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1471_44385)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1096 3.33327L13.1667 0.390457L10.8334 2.72382L13.7762 5.66663L16.1096 3.33327ZM12.8334 6.60944L9.89057 3.66663L1.16675 12.3905V15.3333H4.10956L12.8334 6.60944Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1471_44385">
        <rect width="16" height="16" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default Pencil;

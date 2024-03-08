import { FC } from 'react';

import { SVGProps } from './svg.types';

const ETHChain: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_60_1017)">
      <rect width="24" height="24" fill="#627EEA" />
      <path
        d="M12.17 6L12.0918 6.26582V13.9794L12.17 14.0575L15.7506 11.941L12.17 6Z"
        fill="white"
      />
      <path
        d="M12.1699 6L8.58936 11.941L12.1699 14.0575V10.3136V6Z"
        fill="white"
      />
      <path
        d="M12.17 15.2228L12.126 15.2765V18.0243L12.17 18.153L15.7528 13.1074L12.17 15.2228Z"
        fill="white"
      />
      <path
        d="M12.1699 18.153V15.2228L8.58936 13.1074L12.1699 18.153Z"
        fill="white"
      />
      <path
        d="M12.1699 14.0574L15.7504 11.9409L12.1699 10.3135V14.0574Z"
        fill="white"
      />
      <path
        d="M8.58936 11.9409L12.1699 14.0574V10.3135L8.58936 11.9409Z"
        fill="white"
      />
    </g>
    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white" />
    <defs>
      <clipPath id="clip0_60_1017">
        <rect width="24" height="24" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ETHChain;

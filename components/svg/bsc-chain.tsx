import { FC } from 'react';

import { SVGProps } from './svg.types';

const BSCChain: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_60_996)">
      <rect width="24" height="24" fill="#F8D12F" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.67042 11.0423L12.0011 8.71258L14.3328 11.0442L15.6881 9.68786L12.0011 6L8.31409 9.68691L9.67042 11.0423ZM6 12.0002L7.35584 10.6444L8.71168 12.0002L7.35584 13.356L6 12.0002ZM12.001 15.2883L9.67035 12.9577L8.31212 14.3121L8.31402 14.314L12.001 17.9999L15.6881 14.3121L15.689 14.3111L14.3327 12.9567L12.001 15.2883ZM15.2883 12.0005L16.6442 10.6447L18 12.0005L16.6442 13.3563L15.2883 12.0005ZM12.0011 10.6233L13.3764 11.9995H13.3773L13.3764 12.0005L12.0011 13.3767L10.6258 12.0024L10.6239 11.9995L10.6258 11.9976L10.8666 11.7569L10.9841 11.6403L12.0011 10.6233Z"
        fill="black"
      />
    </g>
    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white" />
    <defs>
      <clipPath id="clip0_60_996">
        <rect width="24" height="24" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BSCChain;

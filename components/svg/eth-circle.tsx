import { FC } from 'react';

import { SVGProps } from './svg.types';

const ETH: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
      fill="white"
    />
    <path
      d="M12.213 4.5L12.1152 4.83228V14.4743L12.213 14.5718L16.6887 11.9263L12.213 4.5Z"
      fill="black"
    />
    <path
      d="M12.213 4.5L7.7373 11.9263L12.213 14.5719V9.89195V4.5Z"
      fill="black"
    />
    <path
      d="M12.2133 16.028L12.1582 16.0952V19.5299L12.2133 19.6908L16.6917 13.3838L12.2133 16.028Z"
      fill="black"
    />
    <path
      d="M12.213 19.6908V16.028L7.7373 13.3838L12.213 19.6908Z"
      fill="black"
    />
    <path
      d="M12.2129 14.5719L16.6885 11.9264L12.2129 9.89209V14.5719Z"
      fill="black"
    />
    <path
      d="M7.7373 11.9264L12.2129 14.572V9.89209L7.7373 11.9264Z"
      fill="black"
    />
  </svg>
);

export default ETH;

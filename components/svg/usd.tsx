import { FC } from 'react';

import { SVGProps } from './svg.types';

const USD: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.2 2V4.4H16.8V6.8H13.2H10.8H10.2C9.72261 6.8 9.26477 6.98964 8.92721 7.32721C8.58964 7.66477 8.4 8.12261 8.4 8.6C8.4 9.07739 8.58964 9.53523 8.92721 9.87279C9.26477 10.2104 9.72261 10.4 10.2 10.4H13.8C14.9139 10.4 15.9822 10.8425 16.7698 11.6302C17.5575 12.4178 18 13.4861 18 14.6C18 15.7139 17.5575 16.7822 16.7698 17.5698C15.9822 18.3575 14.9139 18.8 13.8 18.8H13.2V21.2H10.8V18.8H7.2V16.4H10.8H13.2H13.8C14.2774 16.4 14.7352 16.2104 15.0728 15.8728C15.4104 15.5352 15.6 15.0774 15.6 14.6C15.6 14.1226 15.4104 13.6648 15.0728 13.3272C14.7352 12.9896 14.2774 12.8 13.8 12.8H10.2C9.08609 12.8 8.0178 12.3575 7.23015 11.5698C6.4425 10.7822 6 9.71391 6 8.6C6 7.48609 6.4425 6.4178 7.23015 5.63015C8.0178 4.8425 9.08609 4.4 10.2 4.4H10.8V2H13.2Z"
      fill="currentColor"
    />
  </svg>
);

export default USD;

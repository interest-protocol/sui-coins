import { FC } from 'react';

import { SVGProps } from './svg.types';

const Chart: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9444 5.25L13.3889 5.80556V8.58333H10.0556L9.5 9.13889V11.9167H6.16667L5.61111 12.4722V16.9167H4.5V18.0278H6.16667H10.0556H13.9444H17.8333H19.5V16.9167H18.3889V5.80556L17.8333 5.25H13.9444ZM17.2778 16.9167V6.36111H14.5V9.13889V16.9167H17.2778ZM13.3889 16.9167V9.69444H10.6111V12.4722V16.9167H13.3889ZM6.72222 13.0278H9.5V16.9167H6.72222V13.0278Z"
      fill="currentColor"
    />
  </svg>
);

export default Chart;

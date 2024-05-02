import { FC } from 'react';

import { SVGProps } from './svg.types';

const Fire: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.4684 1.06346L13.4672 0.0656738L10.093 7.15334L6.47035 4.74426L5.91685 5.57812C4.44238 7.79939 3.125 10.4981 3.125 13.1249C3.125 15.4787 4.06004 17.7361 5.72443 19.4005C7.38881 21.0649 9.6462 21.9999 12 21.9999C14.3538 21.9999 16.6112 21.0649 18.2756 19.4005C19.94 17.7361 20.875 15.4787 20.875 13.1249C20.875 7.79221 17.1895 3.77522 14.4684 1.06346ZM10.907 10.0965L14.05 3.49442C16.4982 6.0691 18.875 9.23468 18.875 13.1249C18.875 14.9483 18.1507 16.697 16.8614 17.9863C15.572 19.2756 13.8234 19.9999 12 19.9999C10.1766 19.9999 8.42795 19.2756 7.13864 17.9863C5.84933 16.697 5.125 14.9483 5.125 13.1249C5.125 11.3673 5.91376 9.4092 7.04727 7.52977L10.907 10.0965ZM17.8064 14.0313L17.9627 13.0435L15.9873 12.731L15.831 13.7187C15.7025 14.531 15.32 15.2818 14.7384 15.8634C14.1568 16.445 13.406 16.8275 12.5937 16.956L11.606 17.1123L11.9185 19.0877L12.9063 18.9314C14.1359 18.7368 15.2723 18.1579 16.1526 17.2776C17.0329 16.3973 17.6118 15.2609 17.8064 14.0313Z"
      fill="currentColor"
    />
  </svg>
);

export default Fire;

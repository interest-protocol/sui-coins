import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const SOLChain: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => {
  const id = useId();

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip0_${id})`}>
        <rect width="24" height="24" fill="black" />
        <g clipPath={`url(#clip1_${id}`}>
          <path
            d="M7.94884 14.6235C8.02126 14.5517 8.12083 14.5098 8.22644 14.5098H17.8035C17.9785 14.5098 18.066 14.7194 17.9423 14.8421L16.0504 16.7196C15.978 16.7914 15.8784 16.8334 15.7728 16.8334H6.19576C6.02075 16.8334 5.93325 16.6238 6.05696 16.501L7.94884 14.6235Z"
            fill="white"
          />
          <path
            d="M7.94884 7.61378C8.02427 7.54192 8.12385 7.5 8.22644 7.5H17.8035C17.9785 7.5 18.066 7.7096 17.9423 7.83237L16.0504 9.70982C15.978 9.78168 15.8784 9.8236 15.7728 9.8236H6.19576C6.02075 9.8236 5.93325 9.614 6.05696 9.49123L7.94884 7.61378Z"
            fill="white"
          />
          <path
            d="M16.0504 11.0962C15.978 11.0243 15.8784 10.9824 15.7728 10.9824H6.19576C6.02075 10.9824 5.93325 11.192 6.05696 11.3148L7.94884 13.1922C8.02126 13.2641 8.12083 13.306 8.22644 13.306H17.8035C17.9785 13.306 18.066 13.0964 17.9423 12.9737L16.0504 11.0962Z"
            fill="white"
          />
        </g>
      </g>
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white" />
      <defs>
        <clipPath id={`clip0_${id}`}>
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
        <clipPath id={`clip1_${id}`}>
          <rect
            width="12"
            height="9.33333"
            fill="white"
            transform="translate(6 7.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default SOLChain;

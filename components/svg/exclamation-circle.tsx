import { FC } from 'react';

import { SVGProps } from './svg.types';

const ExclamationCircleSVG: FC<SVGProps> = ({
  maxWidth,
  maxHeight,
  ...props
}) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M6.41634 3.50016H7.58884V4.66683H6.41634V3.50016Z"
      fill="currentColor"
    />
    <path
      d="M7.58301 5.8335V10.5002H6.41634V5.8335H7.58301Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.583008 7.00016C0.583008 3.45634 3.45585 0.583496 6.99967 0.583496C10.5435 0.583496 13.4163 3.45634 13.4163 7.00016C13.4163 10.544 10.5435 13.4168 6.99967 13.4168C3.45585 13.4168 0.583008 10.544 0.583008 7.00016ZM6.99967 1.75016C4.10018 1.75016 1.74967 4.10067 1.74967 7.00016C1.74967 9.89966 4.10018 12.2502 6.99967 12.2502C9.89917 12.2502 12.2497 9.89966 12.2497 7.00016C12.2497 4.10067 9.89917 1.75016 6.99967 1.75016Z"
      fill="currentColor"
    />
  </svg>
);

export default ExclamationCircleSVG;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const XCirlce: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M9 7.58579L12 10.5858L15 7.58579L16.4142 9L13.4142 12L16.4142 15L15 16.4142L12 13.4142L9 16.4142L7.58579 15L10.5858 12L7.58579 9L9 7.58579Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
      fill="currentColor"
    />
  </svg>
);

export default XCirlce;

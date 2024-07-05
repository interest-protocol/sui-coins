import { FC } from 'react';

import { SVGProps } from './svg.types';

const Search: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 6.33333C10 8.63452 8.13452 10.5 5.83333 10.5C3.53215 10.5 1.66667 8.63452 1.66667 6.33333C1.66667 4.03215 3.53215 2.16667 5.83333 2.16667C8.13452 2.16667 10 4.03215 10 6.33333ZM9.32681 11.0053C8.35299 11.7347 7.14361 12.1667 5.83333 12.1667C2.61167 12.1667 0 9.55499 0 6.33333C0 3.11167 2.61167 0.5 5.83333 0.5C9.05499 0.5 11.6667 3.11167 11.6667 6.33333C11.6667 7.64361 11.2347 8.85299 10.5053 9.82681L15.1727 14.4941L13.9941 15.6727L9.32681 11.0053Z"
      fill="currentColor"
    />
  </svg>
);

export default Search;

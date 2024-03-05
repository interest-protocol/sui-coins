import { FC } from 'react';

import { SVGProps } from './svg.types';

const Search: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 8.33333C12.5 10.6345 10.6345 12.5 8.33333 12.5C6.03215 12.5 4.16667 10.6345 4.16667 8.33333C4.16667 6.03215 6.03215 4.16667 8.33333 4.16667C10.6345 4.16667 12.5 6.03215 12.5 8.33333ZM11.8268 13.0053C10.853 13.7347 9.64361 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333C14.1667 9.64361 13.7347 10.853 13.0053 11.8268L17.6727 16.4941L16.4941 17.6727L11.8268 13.0053Z"
      fill="currentColor"
    />
  </svg>
);

export default Search;

import { FC } from 'react';

import { SVGProps } from './svg.types';

const Globe: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M7 9C7 10.0609 7.42143 11.0783 8.17157 11.8284C8.92172 12.5786 9.93913 13 11 13C12.0609 13 13.0783 12.5786 13.8284 11.8284C14.5786 11.0783 15 10.0609 15 9C15 7.93913 14.5786 6.92172 13.8284 6.17157C13.0783 5.42143 12.0609 5 11 5C9.93913 5 8.92172 5.42143 8.17157 6.17157C7.42143 6.92172 7 7.93913 7 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.75 15C6.59393 15.733 7.58187 16.2814 8.65035 16.61C9.71882 16.9385 10.8442 17.0399 11.9542 16.9076C13.0642 16.7754 14.1342 16.4124 15.0956 15.842C16.057 15.2716 16.8884 14.5065 17.5365 13.5957C18.1845 12.6849 18.6349 11.6486 18.8587 10.5533C19.0825 9.45813 19.0747 8.32822 18.8358 7.2362C18.5969 6.14418 18.1323 5.1142 17.4717 4.21243C16.8111 3.31066 15.9692 2.55705 15 2M11 17V21M7 21H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Globe;

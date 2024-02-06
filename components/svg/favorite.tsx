import { FC } from 'react';

import { SVGProps } from './svg.types';

const Favorite: FC<SVGProps & { filled?: boolean }> = ({
  maxWidth,
  maxHeight,
  filled,
  ...props
}) =>
  filled ? (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 24 22"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 0L15.1454 7.78028L23.4276 8.29244L17.2155 13.9266L19.3144 21.7142L12.0001 17.5787L4.68553 21.7141L6.7844 13.9266L0.572266 8.29244L8.85456 7.78028L12.0002 0Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 24 22"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 0L15.1454 7.78028L23.4276 8.29244L17.2155 13.9266L19.3144 21.7142L12.0001 17.5787L4.68553 21.7141L6.7844 13.9266L0.572266 8.29244L8.85456 7.78028L12.0002 0ZM12 5.33607L10.2362 9.69866L5.42761 9.99601L9.03366 13.2666L7.8598 17.622L12.0001 15.2812L16.1401 17.6219L14.9662 13.2666L18.5723 9.99601L13.7636 9.69865L12 5.33607Z"
        fill="currentColor"
      />
    </svg>
  );

export default Favorite;

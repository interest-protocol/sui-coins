import { FC } from 'react';

import { SVGProps } from './svg.types';

const X: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M2.04876 3L9.77054 13.3247L2 21.7192H3.74884L10.5519 14.3697L16.0486 21.7192H22L13.8438 10.8137L21.0765 3H19.3277L13.0624 9.76872L8.00012 3H2.04876Z"
      fill="currentColor"
    />
  </svg>
);

export default X;

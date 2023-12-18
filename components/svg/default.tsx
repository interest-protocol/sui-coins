import { FC } from 'react';

import { SVGProps } from './svg.types';

const Default: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 28 28"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0007 18.4451C16.4552 18.4451 18.4451 16.4552 18.4451 14.0007C18.4451 11.5461 16.4552 9.55621 14.0007 9.55621C11.5461 9.55621 9.55621 11.5461 9.55621 14.0007C9.55621 16.4552 11.5461 18.4451 14.0007 18.4451ZM20.6673 14.0007C20.6673 17.6825 17.6825 20.6673 14.0007 20.6673C10.3188 20.6673 7.33398 17.6825 7.33398 14.0007C7.33398 10.3188 10.3188 7.33398 14.0007 7.33398C17.6825 7.33398 20.6673 10.3188 20.6673 14.0007Z"
      fill="currentColor"
    />
  </svg>
);

export default Default;

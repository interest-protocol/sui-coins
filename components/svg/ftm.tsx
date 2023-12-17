import { FC } from 'react';

import { SVGProps } from './svg.types';

const FTM: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 17 28"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1307 9.70854L15.196 6.75377V12.6633L10.1307 9.70854ZM15.196 22.3719L8.44221 26.3116L1.68844 22.3719V15.4774L8.44221 19.4171L15.196 15.4774V22.3719ZM1.68844 6.75377L6.75377 9.70854L1.68844 12.6633V6.75377ZM9.28643 11.1156L14.3518 14.0704L9.28643 17.0251V11.1156ZM7.59799 17.0251L2.53266 14.0704L7.59799 11.1156V17.0251ZM14.3518 5.34673L8.44221 8.72362L2.53266 5.34673L8.44221 1.82915L14.3518 5.34673ZM0 4.78392V23.2161L8.44221 28L16.8844 23.2161V4.78392L8.44221 0L0 4.78392Z"
      fill="currentColor"
    />
  </svg>
);

export default FTM;

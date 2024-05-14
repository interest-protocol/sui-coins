import { FC } from 'react';

import { SVGProps } from './svg.types';

const TimeRounded: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.16675 8C1.16675 3.94991 4.44999 0.666664 8.50008 0.666664C12.5502 0.666664 15.8334 3.94991 15.8334 8C15.8334 12.0501 12.5502 15.3333 8.50008 15.3333C4.44999 15.3333 1.16675 12.0501 1.16675 8Z"
      fill="#E53E3E"
    />
    <path
      d="M6.68759 5.33334L8.49992 7.14566L10.3122 5.33334L11.1666 6.18768L9.35426 8L11.1666 9.81233L10.3122 10.6667L8.49992 8.85434L6.68759 10.6667L5.83325 9.81233L7.64558 8L5.83325 6.18768L6.68759 5.33334Z"
      fill="white"
    />
  </svg>
);

export default TimeRounded;

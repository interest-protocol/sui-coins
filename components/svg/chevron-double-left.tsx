import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronDoubleLeft: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <path
      d="M0.287689 11.4403L5.06066 6.66729L0.287689 1.89432L1.34835 0.833657L7.18198 6.66729L1.34835 12.5009L0.287689 11.4403ZM5.59099 11.4403L10.364 6.66729L5.59099 1.89432L6.65165 0.833657L12.4853 6.66729L6.65165 12.5009L5.59099 11.4403Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronDoubleLeft;

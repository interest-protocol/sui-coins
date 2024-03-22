import { FC } from 'react';

import { SVGProps } from './svg.types';

const Refresh: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 7.5C14 6.64641 13.8319 5.80117 13.5052 5.01256C13.1786 4.22394 12.6998 3.50739 12.0962 2.90381C11.4926 2.30023 10.7761 1.82144 9.98745 1.49478C9.19883 1.16813 8.3536 1 7.50001 1V0C9.00753 3.92228e-06 10.4801 0.454307 11.7255 1.30365C12.971 2.153 13.9316 3.35797 14.4821 4.7614C15.0326 6.16482 15.1473 7.70156 14.8114 9.17118C14.4755 10.6408 13.7045 11.9751 12.599 13H15V14H11V10H12V12.19C12.6332 11.5841 13.1369 10.8561 13.4807 10.05C13.8244 9.24384 14.0011 8.37636 14 7.5ZM2.40001 2H6.29539e-06V1H4.00001V5H3.00001V2.81C2.0642 3.70798 1.41842 4.86538 1.14573 6.13335C0.873044 7.40132 0.985908 8.72188 1.46981 9.92519C1.95371 11.1285 2.78653 12.1595 3.86115 12.8857C4.93576 13.6118 6.20305 13.9999 7.50001 14V15C5.9924 15.0002 4.51973 14.546 3.27409 13.6968C2.02845 12.8475 1.06768 11.6425 0.517085 10.2391C-0.0335067 8.8356 -0.148352 7.29878 0.18753 5.82906C0.523412 4.35935 1.29443 3.02497 2.40001 2Z"
      fill="currentColor"
    />
  </svg>
);

export default Refresh;

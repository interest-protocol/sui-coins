import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from './svg.types';

const DotSuccess: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => {
  const { colors } = useTheme() as Theme;
  return (
    <svg
      style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z"
        fill={colors.success}
      />
    </svg>
  );
};

export default DotSuccess;

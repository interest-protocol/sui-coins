import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const CustomCursor: FC = ({ x, y, height }: any) => {
  const { colors } = useTheme() as Theme;

  return (
    <g>
      <line
        y1={y}
        x1={x + 7}
        x2={x + 7}
        y2={height}
        strokeWidth={0.5}
        strokeDasharray="3 3"
        stroke={colors.outline}
      />
    </g>
  );
};

export default CustomCursor;

import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const CustomizedAxisTick: FC<any> = ({ x, y, payload, dy }) => {
  const { dark } = useTheme() as Theme;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={dy}
        fontSize="0.75rem"
        textAnchor="middle"
        style={{ fontFamily: 'Proto' }}
        fill={dark ? 'white' : 'black'}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;

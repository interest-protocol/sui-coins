import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CustomXAxisTickProps } from './x-axis-tick.types';

const CustomXAxisTick: FC<CustomXAxisTickProps> = (props) => {
  const { dark } = useTheme() as Theme;
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        fontSize="0.75rem"
        textAnchor="middle"
        fill={dark ? 'white' : 'black'}
      >
        <tspan fill={dark ? 'white' : 'black'} style={{ fontFamily: 'Proto' }}>
          {payload?.value}
        </tspan>
      </text>
    </g>
  );
};

export default CustomXAxisTick;

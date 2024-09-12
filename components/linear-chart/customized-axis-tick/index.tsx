import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { formatMoney } from '@/utils';

const CustomizedAxisTick: FC<any> = ({ x, y, payload, dy, money }) => {
  const { dark } = useTheme() as Theme;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={dy}
        fontSize="0.75rem"
        fill={dark ? 'white' : 'black'}
        textAnchor={dy ? 'middle' : 'end'}
      >
        {money ? formatMoney(payload.value, undefined, true) : payload.value}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;

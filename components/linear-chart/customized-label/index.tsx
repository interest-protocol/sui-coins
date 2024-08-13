import { FC } from 'react';

const CustomizedLabel: FC<any> = (props: any) => {
  const { x, y, stroke, date } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={14} textAnchor="middle">
      {date}
    </text>
  );
};

export default CustomizedLabel;

import { FC, SVGAttributes } from 'react';

const LineLoader: FC<SVGAttributes<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 331 2" fill="none" {...props}>
      <rect width="331" height="2" fill="#666666" />
      <rect width="23" height="2" fill="#F0F0F0" />
    </svg>
  );
};

export default LineLoader;

import { not } from 'ramda';
import { FC, SVGAttributes, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

const LineLoader: FC<SVGAttributes<SVGSVGElement>> = (props) => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    x: 308,
    reset: true,
    reverse: flip,
    from: { x: 0 },
    config: config.slow,
    onRest: () => setFlip(not),
  });

  return (
    <svg viewBox="0 0 331 2" fill="none" {...props}>
      <rect width="331" height="2" fill="#666666" />
      <animated.rect x={x} width="23" height="2" fill="#F0F0F0" />
    </svg>
  );
};

export default LineLoader;

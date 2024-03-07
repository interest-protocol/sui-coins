import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailCollapseProps } from './accordion.type';
import CollapseIcon from './accordion-icon';

const variants = {
  collapsed: {
    height: 'auto',
  },
  rest: { height: 0 },
};

const PoolDetailCollapse: FC<PoolDetailCollapseProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCollapseClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
        display="flex"
        height="3.5rem"
        cursor="pointer"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleCollapseClick}
        px="s"
      >
        <Typography size="large" variant="label">
          {title}
        </Typography>
        <Motion initial="rest" animate={isExpanded ? 'collapsed' : 'rest'}>
          <CollapseIcon />
        </Motion>
      </Box>
      <Motion
        initial="rest"
        variants={variants}
        animate={isExpanded ? 'collapsed' : 'rest'}
        overflow="hidden"
        borderBottom="1px solid"
        px="s"
      >
        {children}
      </Motion>
    </>
  );
};

export default PoolDetailCollapse;

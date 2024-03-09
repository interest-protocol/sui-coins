import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailAccordionProps } from './accordion.type';
import CollapseIcon from './accordion-icon';

const variants = {
  collapsed: {
    height: 'auto',
  },
  rest: { height: 0 },
};

const PoolDetailCollapse: FC<PoolDetailAccordionProps> = ({
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
        px="xl"
      >
        <Typography size="large" variant="label">
          {title}
        </Typography>
        <Motion
          initial="rest"
          animate={isExpanded ? 'collapsed' : 'rest'}
          display="flex"
          alignItems="center"
        >
          <CollapseIcon />
        </Motion>
      </Box>
      <Motion
        initial="rest"
        variants={variants}
        animate={isExpanded ? 'collapsed' : 'rest'}
        overflow="hidden"
        borderBottom="1px solid"
        borderBottomColor="outlineVariant"
        px="xl"
      >
        {children}
      </Motion>
    </>
  );
};

export default PoolDetailCollapse;

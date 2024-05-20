import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { PoolDetailAccordionProps } from './accordion.types';
import CollapseIcon from './accordion-icon';

const variants = {
  collapsed: {
    height: 'auto',
    display: 'block',
  },
  rest: { height: 0, display: 'none' },
};

const PoolDetailCollapse: FC<PoolDetailAccordionProps> = ({
  title,
  noBorder,
  children,
  loading,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCollapseClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
        px="xl"
        display="flex"
        height="3.5rem"
        cursor="pointer"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleCollapseClick}
      >
        {title ? (
          <Typography size="large" variant="label">
            {title}
          </Typography>
        ) : loading ? (
          <Skeleton width="8rem" />
        ) : (
          ''
        )}
        <Motion
          display="flex"
          initial="rest"
          alignItems="center"
          animate={isExpanded ? 'collapsed' : 'rest'}
        >
          <CollapseIcon />
        </Motion>
      </Box>
      <Motion
        px="xl"
        initial="rest"
        variants={variants}
        borderBottom="1px solid"
        animate={isExpanded ? 'collapsed' : 'rest'}
        borderBottomColor={noBorder ? 'transparent' : 'outlineVariant'}
      >
        {children}
      </Motion>
    </>
  );
};

export default PoolDetailCollapse;

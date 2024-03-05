import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { MinusSVG, PlusSVG } from '@/svg';

import { PoolDetailCollapseProps } from './pool-detail-collapse.type';

const PoolDetailCollapse: FC<PoolDetailCollapseProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCollapseClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box borderBottom="1px solid" px="s">
      <Box
        display="flex"
        height="3.5rem"
        cursor="pointer"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleCollapseClick}
      >
        <Typography size="large" variant="label">
          {title}
        </Typography>
        <Box>
          {isExpanded ? (
            <MinusSVG maxHeight="2.5rem" maxWidth="2.5rem" width="2.5rem" />
          ) : (
            <PlusSVG maxHeight="2.5rem" maxWidth="2.5rem" width="2.5rem" />
          )}
        </Box>
      </Box>
      {isExpanded ? <Box py="s">{children}</Box> : null}
    </Box>
  );
};

export default PoolDetailCollapse;

import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { InformationCircleSVG } from '@/svg';

import { PoolDetailsCollapseItemStandardProps } from './pool-detail-collapse.type';

const PoolDetailsCollapseItemStandard: FC<
  PoolDetailsCollapseItemStandardProps
> = ({ label, content, hasAddtionalInfo }) => {
  return (
    <Box
      py="s"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography size="medium" variant="body">
        {label}
      </Typography>
      <Box
        px="m"
        py="xs"
        display="flex"
        bg="onSurface"
        borderRadius="xs"
        alignItems="center"
        color="lowContainer"
        justifyContent="space-between"
      >
        <Box mr="xs">{content}</Box>
        {hasAddtionalInfo && (
          <InformationCircleSVG
            width="14px"
            maxWidth="14px"
            maxHeight="14px"
            cursor="pointer"
          />
        )}
      </Box>
    </Box>
  );
};

export default PoolDetailsCollapseItemStandard;

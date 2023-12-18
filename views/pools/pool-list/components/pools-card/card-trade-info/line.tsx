import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { QuestionCircleSVG } from '@/svg';

import { PoolCardLineProps } from '../pool-card.types';

const LineInfo: FC<PoolCardLineProps> = ({
  description,
  amount,
  tooltipInfo,
  lastLine,
}) => (
  <Box
    key={v4()}
    display="flex"
    justifyContent="space-between"
    alignItems="flex-start"
    alignSelf="stretch"
    py="0.5rem"
    borderBottom="1px solid"
    borderColor={lastLine ? 'outlineVariant' : 'transparent'}
  >
    <Typography
      textTransform="capitalize"
      color="outline"
      size="medium"
      variant="body"
    >
      {description}
    </Typography>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Typography color="onSurface" size="medium" variant="body" pr="0.5rem">
        {amount}
      </Typography>
      <TooltipWrapper
        bg="onSurface"
        tooltipContent={
          <Typography variant="body" size="medium" color="surface">
            {tooltipInfo}
          </Typography>
        }
        tooltipPosition="right"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="0.875rem"
          height="1.27rem"
          color="onSurface"
        >
          <QuestionCircleSVG
            maxWidth="100%"
            maxHeight="100%"
            width="1.5rem"
            height="1.5rem"
          />
        </Box>
      </TooltipWrapper>
    </Box>
  </Box>
);

export default LineInfo;

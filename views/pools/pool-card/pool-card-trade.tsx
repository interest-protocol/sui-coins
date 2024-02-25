import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { QuestionCircleSVG } from '@/svg';

import { PoolCardTradeProps } from './pool-card.types';

const PoolCardTrade: FC<PoolCardTradeProps> = ({
  index,
  amount,
  tooltipInfo,
  description,
}) => (
  <Box
    py="xs"
    key={v4()}
    display="flex"
    borderTop="1px solid"
    justifyContent="space-between"
    borderColor={index ? 'outlineVariant' : 'transparent'}
  >
    <Typography
      size="medium"
      color="outline"
      variant="body"
      textTransform="capitalize"
    >
      {description}
    </Typography>
    <Box display="flex" gap="xs" alignItems="center">
      <Typography color="onSurface" size="medium" variant="body">
        {index >= 1 ? '$' : ''}
        {amount}%
      </Typography>
      <TooltipWrapper
        bg="onSurface"
        tooltipPosition="right"
        tooltipContent={
          <Typography variant="body" size="medium" color="surface">
            {tooltipInfo}
          </Typography>
        }
      >
        <Box color="onSurface">
          <QuestionCircleSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        </Box>
      </TooltipWrapper>
    </Box>
  </Box>
);

export default PoolCardTrade;

import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { QuestionCircleSVG } from '@/svg';

import { PoolTradeInfoProps } from './pool-card.types';

const CardTradeInfo: FC<PoolTradeInfoProps> = ({ lines }) => (
  <Box px="m" py="xs" bg="surface" borderRadius="1rem">
    {lines.map((line, index) => (
      <Box
        py="xs"
        key={v4()}
        display="flex"
        borderBottom="1px solid"
        justifyContent="space-between"
        borderColor={
          lines.length - 1 > index ? 'outlineVariant' : 'transparent'
        }
      >
        <Typography
          size="medium"
          color="outline"
          variant="body"
          textTransform="capitalize"
        >
          {line.description}
        </Typography>
        <Box display="flex" gap="xs" alignItems="center">
          <Typography color="onSurface" size="medium" variant="body">
            {index >= 1 ? '$' : ''}
            {line.amount}%
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            tooltipPosition="right"
            tooltipContent={
              <Typography variant="body" size="medium" color="surface">
                {line.tooltipInfo}
              </Typography>
            }
          >
            <QuestionCircleSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </TooltipWrapper>
        </Box>
      </Box>
    ))}
  </Box>
);

export default CardTradeInfo;

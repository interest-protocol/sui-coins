import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { QuestionCircleSVG } from '@/svg';

import { PoolTradeInfoProps } from './pool-card.types';

const CardTradeInfo: FC<PoolTradeInfoProps> = ({ lines }) => (
  <Box
    bg="surface"
    borderRadius="1rem"
    px="1rem"
    py="0.5rem"
    width={['100%', '100%', '100%', '19rem']}
  >
    {lines.map((line, index) => (
      <Box
        key={v4()}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        alignSelf="stretch"
        py="0.5rem"
        borderBottom="1px solid"
        borderColor={
          lines.length - 1 > index ? 'outlineVariant' : 'transparent'
        }
      >
        <Typography
          textTransform="capitalize"
          color="outline"
          size="medium"
          variant="body"
        >
          {line.description}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          minWidth="10rem"
        >
          <Typography
            color="onSurface"
            size="medium"
            variant="body"
            pr="0.5rem"
          >
            {index >= 1 ? '$' : ''}
            {line.amount}%
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            tooltipContent={
              <Typography variant="body" size="medium" color="surface">
                {line.tooltipInfo}
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
    ))}
  </Box>
);

export default CardTradeInfo;

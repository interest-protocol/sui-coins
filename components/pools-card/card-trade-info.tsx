import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import QuestionCircleSVG from '../svg/question.circle';
import { PoolCardProps } from './pools-card.types';

const CardTradeInfo: FC<PoolCardProps> = ({ fee, liquidity, volume }) => {
  return (
    <Box bg="#F8F9FD" borderRadius="1rem" px="1rem" py="0.5rem" width="19rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        py="0.5rem"
        borderBottom="1px solid"
        borderColor="#C6C6CA"
      >
        <Typography
          fontSize="0.875rem"
          lineHeight="1.25rem"
          color="#585858"
          textTransform="capitalize"
          size={'small'}
          variant={'body'}
        >
          Fee
        </Typography>
        <TooltipWrapper
          bg="onSurface"
          tooltipContent={
            <Typography variant="body" size={'medium'} color="surface">
              Fee for each transation
            </Typography>
          }
          tooltipPosition="right"
        >
          <Box
            minWidth="10rem"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography
              color="onSurface"
              size={'small'}
              variant={'body'}
              pr="0.5rem"
            >
              ${fee}
            </Typography>
            <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
          </Box>
        </TooltipWrapper>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        py="0.5rem"
        borderBottom="1px solid"
        borderColor="#C6C6CA"
      >
        <Typography
          fontSize="0.875rem"
          lineHeight="1.25rem"
          color="#585858"
          textTransform="capitalize"
          size={'small'}
          variant={'body'}
        >
          Liquidity
        </Typography>
        <TooltipWrapper
          bg="onSurface"
          tooltipContent={
            <Typography variant="body" size={'medium'} color="surface">
              Liquidity
            </Typography>
          }
          tooltipPosition="right"
        >
          <Box
            minWidth="10rem"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography
              color="onSurface"
              size={'small'}
              variant={'body'}
              pr="0.5rem"
            >
              ${liquidity}
            </Typography>
            <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
          </Box>
        </TooltipWrapper>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        py="0.5rem"
      >
        <Typography
          fontSize="0.875rem"
          lineHeight="1.25rem"
          color="#585858"
          textTransform="capitalize"
          size={'small'}
          variant={'body'}
        >
          Volume (24h)
        </Typography>
        <TooltipWrapper
          bg="onSurface"
          tooltipContent={
            <Typography variant="body" size={'medium'} color="surface">
              Volume
            </Typography>
          }
          tooltipPosition="right"
        >
          <Box
            minWidth="10rem"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography
              color="onSurface"
              size={'small'}
              variant={'body'}
              pr="0.5rem"
            >
              ${volume}
            </Typography>
            <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
          </Box>
        </TooltipWrapper>
      </Box>
    </Box>
  );
};

export default CardTradeInfo;

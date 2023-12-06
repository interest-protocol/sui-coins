import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import QuestionCircleSVG from '../../../components/svg/question.circle';
import { PoolTradeInfoProps } from './pools-card.types';

const CardTradeInfo: FC<PoolTradeInfoProps> = ({ lines }) => {
  return (
    <Box bg="surf" borderRadius="1rem" px="1rem" py="0.5rem" width="19rem">
      {lines.map((line) => (
        <Box
          key={v4()}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          alignSelf="stretch"
          py="0.5rem"
          borderBottom="1px solid"
          borderColor="#C6C6CA"
        >
          <Typography
            fontSize="0.875rem"
            lineHeight="1.25rem"
            textTransform="capitalize"
            color="outline"
            size={'small'}
            variant={'body'}
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
              size={'small'}
              variant={'body'}
              pr="0.5rem"
            >
              ${line.amount}%
            </Typography>
            <TooltipWrapper
              bg="onSurface"
              tooltipContent={
                <Typography variant="body" size={'medium'} color="surface">
                  {line.tooltipInfo}
                </Typography>
              }
              tooltipPosition="right"
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width="0.875rem"
                height="1rem"
              >
                <QuestionCircleSVG maxWidth="100%" maxHeight="100%" />
              </Box>
            </TooltipWrapper>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CardTradeInfo;

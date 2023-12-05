import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import QuestionCircleSVG from '../svg/question.circle';

const CardTradeInfo: FC = () => {
  return (
    <Box bg="#F8F9FD" borderRadius="1rem" px="1rem" py="0.5rem" width="19rem">
      <Box
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
          color="#585858"
          textTransform="capitalize"
          size={'small'}
          variant={'body'}
        >
          Fee
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
            $000%
          </Typography>
          <TooltipWrapper
            bg="onSurface"
            tooltipContent={
              <Typography variant="body" size={'medium'} color="surface">
                Fee for each transaction
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
      <Box
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
          color="#585858"
          textTransform="capitalize"
          size={'small'}
          variant={'body'}
        >
          Liquidity
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
            $000.000
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        alignSelf="stretch"
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
          Volume (24)
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
            $000.000
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
    </Box>
  );
};

export default CardTradeInfo;

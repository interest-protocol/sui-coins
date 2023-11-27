import {
  Box,
  Tag,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ArrowObliqueSVG from '../svg/arrow-oblique';
import DefaultToken from '../svg/default-token';
import IPX from '../svg/ipx';
import QuestionCircleSVG from '../svg/question.circle';
import { PoolCardProps } from './pools-card.types';

const PoolsCard: FC<PoolCardProps> = ({
  protocol,
  coins,
  value,
  fee,
  liquidity,
  volume,
}) => {
  return (
    <Box
      display="flex"
      bg="#FFF"
      borderRadius="1rem"
      border="0.063rem solid #C6C6CA"
      width={['21rem', 'NONE']}
      height="auto"
      p="1rem"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="1.5px"
      transition="all 300ms ease-in-out"
      nHover={{
        border: 'none',
        boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
        '.arrow-wrapper': {
          opacity: 1,
        },
      }}
    >
      <Box width="100%" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tag
            PrefixIcon={() => <IPX maxHeight="1rem" maxWidth="1rem" />}
            size="small"
            variant="outline"
          >
            <Typography
              display="flex"
              flexDirection="row"
              fontFamily="Proto"
              lineHeight="1rem"
              fontSize="0.75rem"
              textDecoration="upper-case"
              marginLeft="0.3rem"
              size={'small'}
              variant={'body'}
            >
              {protocol}
            </Typography>
          </Tag>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            width="1.5rem"
            height="1.5rem"
            bg="transparent"
            border="none"
            cursor="pointer"
            opacity="0"
            className="arrow-wrapper"
          >
            <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" />
          </Box>
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt="1.5rem"
            mb="1.5rem"
          >
            <Box
              minWidth="19rem"
              height="2.5rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              alignSelf="stretch"
              gap="1rem"
              mb="1rem"
            >
              <Box borderRadius="1rem" minHeight="2.5rem" minWidth="2.5rem">
                <DefaultToken maxHeight="100%" maxWidth="100%" />
              </Box>
              <Box borderRadius="1rem" minHeight="2.5rem" minWidth="2.5rem">
                <DefaultToken maxHeight="100%" maxWidth="100%" />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                lineHeight="1.7rem"
                fontWeight="700"
                fontSize="1rem"
                textTransform="uppercase"
                size={'small'}
                variant={'body'}
              >
                {/* SUI • USDC */ coins}
              </Typography>
              <Typography
                textTransform="uppercase"
                fontFamily="Proto"
                fontSize="0.875rem"
                lineHeight="1.25rem"
                color="#0053DB"
                size={'large'}
                variant={'body'}
              >
                {/* 304.66% APR */ value}% APR
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box bg="#F8F9FD" borderRadius="1rem" px="1rem" py="0.5rem">
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
              tooltipContent={
                <Typography variant="body" size={'medium'}>
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
              tooltipContent={
                <Typography variant="body" size={'medium'}>
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
              tooltipContent={
                <Typography variant="body" size={'medium'}>
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
      </Box>
    </Box>
  );
};

export default PoolsCard;

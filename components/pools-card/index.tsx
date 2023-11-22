import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import ArrowObliqueSVG from '../svg/arrow-oblique';
import DefaultToken from '../svg/default-token';
import QuestionCircleSVG from '../svg/question.circle';
import SuiLogo from '../svg/sui-logo';
import { PoolCardProps } from './pools-card.types';

const PoolsCard: FC<PoolCardProps> = ({
  dexName,
  coins,
  value,
  fee,
  liquidity,
  volume,
}) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
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
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box width="100%" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            as="button"
            bg="transparent"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            borderRadius="1rem"
            border="0.063rem solid #C6C6CA"
            p="0.2rem"
            width="6rem"
            cursor="pointer"
          >
            <SuiLogo maxHeight="1rem" maxWidth="1rem" />
            <Typography
              fontFamily="Proto"
              fontSize="0.75rem"
              textDecoration="upper-case"
              marginLeft="0.3rem"
              size={'small'}
              variant={'body'}
            >
              {dexName}
            </Typography>
          </Box>
          <Box
            as="button"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="1.5rem"
            height="1.5rem"
            bg="transparent"
            border="none"
            cursor="pointer"
          >
            {isHovered && (
              <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" />
            )}
          </Box>
        </Box>
        <Box marginTop="1.5rem" marginBottom="1.5rem">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              marginBottom="1rem"
            >
              <Box
                borderRadius="1rem"
                marginRight="0.5rem"
                width="3rem"
                height="3rem"
              >
                <DefaultToken maxHeight="3rem" maxWidth="3rem" />
              </Box>
              <Box
                borderRadius="1rem"
                marginLeft="0.5rem"
                width="3rem"
                height="3rem"
              >
                <DefaultToken maxHeight="3rem" maxWidth="3rem" />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                lineHeight="1.7rem"
                fontWeight="700"
                fontSize="1rem"
                textTransform="uppercase"
                fontFamily="Satoshi"
                textIndent="0.5rem"
                size={'small'}
                variant={'body'}
              >
                {/* SUI • USDC */ coins}
              </Typography>
              <Typography
                textTransform="uppercase"
                fontFamily="Proto"
                fontWeight="500"
                fontSize="0.875rem"
                lineHeight="1.25rem"
                color="#0053DB"
                size={'small'}
                variant={'body'}
              >
                {/* 304.66% APR */ value}%APR
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
              fontFamily="Satoshi"
              fontSize="0.875rem"
              fontWeight="500"
              lineHeight="1.25rem"
              color="#585858"
              textTransform="capitalize"
              size={'small'}
              variant={'body'}
            >
              Fee
            </Typography>
            <Box
              minWidth="10rem"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography textAlign="right" size={'small'} variant={'body'}>
                ${fee}
              </Typography>
              <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
            </Box>
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
              fontFamily="Satoshi"
              fontSize="0.875rem"
              fontWeight="500"
              lineHeight="1.25rem"
              color="#585858"
              textTransform="capitalize"
              size={'small'}
              variant={'body'}
            >
              Liquidity
            </Typography>
            <Box
              minWidth="10rem"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography textAlign="right" size={'small'} variant={'body'}>
                ${liquidity}
              </Typography>
              <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            py="0.5rem"
          >
            <Typography
              fontFamily="Satoshi"
              fontSize="0.875rem"
              fontWeight="500"
              lineHeight="1.25rem"
              color="#585858"
              textTransform="capitalize"
              size={'small'}
              variant={'body'}
            >
              Volume (24h)
            </Typography>
            <Box
              minWidth="10rem"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap="0.5rem"
            >
              <Typography textAlign="right" size={'small'} variant={'body'}>
                ${volume}
              </Typography>
              <QuestionCircleSVG maxWidth="0.875rem" maxHeight="1rem" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolsCard;

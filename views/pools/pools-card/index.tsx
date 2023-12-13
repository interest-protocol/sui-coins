import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DefaultTokenSVG, IPXRoundedSVG } from '@/svg';

import CardTradeInfo from './card-trade-info';
import PoolCardHeader from './pool-card-header';
import TokenInfo from './token-info';

const PoolCard: FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap="0.5rem"
    bg="lowestContainer"
    borderRadius="1rem"
    border="0.063rem solid #C6C6CA"
    width={['100%', '100%', '100%', '21rem']}
    p="1rem"
    transition="all 300ms ease-in-out"
    nHover={{
      border: 'none',
      boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
      '.arrow-wrapper': {
        opacity: 1,
      },
    }}
  >
    <PoolCardHeader
      name="Interest"
      url="#"
      Logo={
        <Box
          p="S"
          width="1.3rem"
          height="1.3rem"
          display="flex"
          color="lowestContainer"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
          bg="transparent"
        >
          <IPXRoundedSVG
            maxWidth="1.125rem"
            maxHeight="1.125rem"
            width="100%"
          />
        </Box>
      }
    />
    <TokenInfo
      apr="333.45"
      tokenList={[
        {
          symbol: 'USDT',
          Icon: DefaultTokenSVG,
        },
        {
          symbol: 'USDT',
          Icon: DefaultTokenSVG,
        },
        {
          symbol: 'USDT',
          Icon: DefaultTokenSVG,
        },
        {
          symbol: 'USDT',
          Icon: DefaultTokenSVG,
        },
      ]}
    />
    <CardTradeInfo
      lines={[
        {
          description: 'Fee',
          amount: '000',
          tooltipInfo: 'Fee per transaction',
        },
        {
          description: 'Liquidity',
          amount: '234.566',
          tooltipInfo: 'Liquidity',
        },
        {
          description: 'Volume (24)',
          amount: '234.88',
          tooltipInfo: 'Volume',
        },
      ]}
    />
  </Box>
);

export default PoolCard;

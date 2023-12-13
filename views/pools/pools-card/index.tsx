import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DefaultTokenSVG, IPXRoundedSVG } from '@/svg';

import CardTradeInfo from './card-trade-info';
import PoolCardHeader from './pool-card-header';
import { LINES } from './pools-card.data';
import TokenInfo from './token-info';

const TOKENS_LIST = [
  {
    symbol: 'USDT',
    Icon: DefaultTokenSVG,
  },
  {
    symbol: 'USDT',
    Icon: DefaultTokenSVG,
  },
];

const PoolCard: FC = () => (
  <Box
    p="m"
    gap="xs"
    display="flex"
    bg="lowestContainer"
    borderRadius="1rem"
    flexDirection="column"
    justifyContent="center"
    border="0.063rem solid"
    borderColor="outlineVariant"
    transition="all 300ms ease-in-out"
    nHover={{
      borderColor: 'transparent',
      boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
      '.arrow-wrapper': {
        opacity: 1,
      },
    }}
  >
    <PoolCardHeader
      url="#"
      name="Interest"
      Logo={<IPXRoundedSVG width="100%" maxWidth="1.4rem" maxHeight="1.4rem" />}
    />
    <TokenInfo apr="333.45" tokenList={TOKENS_LIST} />
    <CardTradeInfo lines={LINES} />
  </Box>
);

export default PoolCard;

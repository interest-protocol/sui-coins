import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CardTradeInfo from './card-trade-info';
import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import TokenInfo from './token-info';

const PoolCard: FC<PoolCardProps> = ({ dexInfo, pairInfo, tradeInfo }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap="0.5rem"
    bg="lowestContainer"
    borderRadius="1rem"
    border="0.063rem solid #C6C6CA"
    maxWidth="21rem"
    mx="auto"
    width="100%"
    transition="all 300ms ease-in-out"
    nHover={{
      border: 'none',
      boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
      '.arrow-wrapper': {
        opacity: 1,
      },
    }}
  >
    <PoolCardHeader {...dexInfo} />
    <TokenInfo {...pairInfo} />
    <CardTradeInfo {...tradeInfo} />
  </Box>
);

export default PoolCard;

import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CardTradeInfo from './card-trade-info';
import PoolCardHeader from './pool-card-header';
import { PoolCardProps } from './pools-card.types';
import TokenInfo from './token-info';

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
      <PoolCardHeader protocol={protocol} />
      <TokenInfo coins={coins} value={value} />
      <CardTradeInfo fee={fee} liquidity={liquidity} volume={volume} />
    </Box>
  );
};

export default PoolsCard;

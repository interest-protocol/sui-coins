import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { DEX_MAP, LINES } from './pool-card.data';
import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ tokens, dex, poolObjectId }) => {
  const Icon = DEX_MAP[dex].Icon;

  // TODO: should be updated with real value
  const apr = '345.44';

  return (
    <Box
      p="m"
      gap="2xs"
      display="flex"
      bg="lowestContainer"
      borderRadius="xs"
      flexDirection="column"
      justifyContent="center"
      border="0.063rem solid"
      borderColor="outlineVariant"
      transition="all 300ms ease-in-out"
      nHover={{
        borderColor: 'transparent',
        boxShadow: '0px -1px 20px 0px rgb(215 215 215 / 17%)',
        '.arrow-wrapper': {
          opacity: 1,
        },
      }}
    >
      <PoolCardHeader
        objectId={poolObjectId}
        name={DEX_MAP[dex].name}
        dexUrl={DEX_MAP[dex].url}
        Logo={<Icon width="100%" maxWidth="1.4rem" maxHeight="1.4rem" />}
      />
      <PoolCardInfo apr={apr} coins={tokens} />
      <Box px="m" py="xs" bg="surface" borderRadius="1rem">
        {LINES.map((line, index) => (
          <PoolCardTrade {...line} index={index} key={v4()} />
        ))}
      </Box>
    </Box>
  );
};

export default PoolCard;

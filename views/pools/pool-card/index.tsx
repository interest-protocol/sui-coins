import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';

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
    <Link href={`${Routes[RoutesEnum.PoolDetails]}?objectId=${poolObjectId}`}>
      <Box
        p="m"
        flex="1"
        gap="xs"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        justifyContent="center"
        border="0.063rem solid"
        borderColor="outlineVariant"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': {
            opacity: 1,
          },
        }}
      >
        <PoolCardHeader
          objectId={poolObjectId}
          name={DEX_MAP[dex].name}
          tags={DEX_MAP[dex].tags}
          dexUrl={DEX_MAP[dex].url}
          Logo={<Icon width="100%" maxWidth="1rem" maxHeight="1rem" />}
        />
        <PoolCardInfo apr={apr} coins={tokens} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          {LINES.map((line, index) => (
            <PoolCardTrade {...line} index={index} key={v4()} />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCard;

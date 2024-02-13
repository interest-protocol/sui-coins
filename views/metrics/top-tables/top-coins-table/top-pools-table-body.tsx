import { Box, Typography } from '@interest-protocol/ui-kit';
import { sort, toPairs } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { getMetric } from '@/api/metrics';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { DefaultSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { TopCoinTableItem } from '../../metrics.types';
import { getCoinFromMetricLabel } from '../../metrics.utils';
import TableRow from '../table-row';
import TopTableSkeleton from '../top-table-skeleton';

const TopPoolsTableBody: FC = () => {
  const { network } = useNetwork();
  const [data, setData] = useState<ReadonlyArray<TopCoinTableItem>>([]);

  useEffect(() => {
    getMetric('get-top-coins').then((topCoins) =>
      setData(
        toPairs(topCoins).map(
          ([coin, info]) =>
            ({
              ...info,
              coin: getCoinFromMetricLabel(coin),
            }) as TopCoinTableItem
        )
      )
    );
  }, []);

  if (!data.length) return <TopTableSkeleton />;

  return (
    <>
      {sort((item1, item2) => (+item1.a > +item2.a ? -1 : 1), data).map(
        ({ coin, a, b, c }, index) => {
          const CoinIcon =
            TOKEN_ICONS[network][coin?.type as string] ?? DefaultSVG;

          return (
            <Box key={v4()}>
              <TableRow numCols={4} withBG={!(index % 2)}>
                <Box display="flex" alignItems="center" gap="xl">
                  <Typography variant="label" size="large" textAlign="center">
                    {`${index < 9 ? '0' : ''}${index + 1}`}
                  </Typography>
                  <Box display="flex" gap="m" alignItems="center">
                    <Box display="flex" gap="2xs">
                      <Box
                        key={v4()}
                        display="flex"
                        width="2.5rem"
                        bg="onSurface"
                        color="surface"
                        height="2.5rem"
                        borderRadius="xs"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CoinIcon
                          maxWidth="1.5rem"
                          maxHeight="1.5rem"
                          width="100%"
                        />
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Typography variant="body" size="large">
                        {coin?.symbol}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(a ?? 0, 2)}
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(b ?? 0, 2)}
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(c ?? 0, 2)}
                </Typography>
              </TableRow>
            </Box>
          );
        }
      )}
    </>
  );
};

export default TopPoolsTableBody;

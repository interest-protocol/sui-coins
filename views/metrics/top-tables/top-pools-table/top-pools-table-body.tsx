import { Box, Typography } from '@interest-protocol/ui-kit';
import { sort, toPairs } from 'ramda';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { getMetric } from '@/api/metrics';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { DefaultSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { TopPoolsTableItem } from '../../metrics.types';
import { getPoolFromMetricLabel } from '../../metrics.utils';
import TableRow from '../table-row';

const TopPoolsTableBody: FC = () => {
  const { network } = useNetwork();
  const [data, setData] = useState<ReadonlyArray<TopPoolsTableItem>>([]);

  useEffect(() => {
    getMetric('get-top-pools')
      .then((topPools) =>
        setData(
          toPairs(topPools).map(
            ([pair, info]) =>
              ({
                ...info,
                pool: getPoolFromMetricLabel(pair),
              }) as TopPoolsTableItem
          )
        )
      )
      .catch((error) => console.log(error, '>>>Look this error'));
  }, []);

  if (!data.length)
    return (
      <>
        <Skeleton height="2rem" width="100%" />
        <Skeleton height="2rem" width="100%" style={{ marginTop: '1rem' }} />
      </>
    );

  return (
    <>
      {sort((item1, item2) => (+item1.a > +item2.a ? -1 : 1), data).map(
        ({ pool, a, b, c, d }, index) => {
          const FirstIcon =
            TOKEN_ICONS[network][pool?.token0.type as string] ?? DefaultSVG;

          const SecondIcon =
            TOKEN_ICONS[network][pool?.token1.type as string] ?? DefaultSVG;

          return (
            <Box key={v4()}>
              <TableRow numCols={6} withBG={!(index % 2)}>
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
                        <FirstIcon
                          maxWidth="1.5rem"
                          maxHeight="1.5rem"
                          width="100%"
                        />
                      </Box>
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
                        <SecondIcon
                          maxWidth="1.5rem"
                          maxHeight="1.5rem"
                          width="100%"
                        />
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Typography variant="body" size="large">
                        {`${pool?.token0.symbol} • ${pool?.token1.symbol}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(a ?? 0, 2)}
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {Number(
                    (a && b
                      ? (365 * (b * (pool?.stable ? 0.05 : 0.3))) / a
                      : 0
                    ).toFixed(2)
                  ).toPrecision()}
                  %
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(b ?? 0, 2)}
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(c ?? 0, 2)}
                </Typography>
                <Typography variant="body" size="large" textAlign="center">
                  {formatDollars(d ?? 0, 2)}
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

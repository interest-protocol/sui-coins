import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { SUISVG } from '@/svg';
import { formatDollars } from '@/utils';

import TableRow from '../table-row';

const TopPoolsTableBody: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return !loading ? (
    <>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <Box key={v4()}>
            <TableRow numCols={4} withBG={!(index % 2)}>
              <Box display="flex" alignItems="center" gap="xl">
                <Typography variant="label" size="large" textAlign="center">
                  0{index}
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
                      <SUISVG
                        maxWidth="1.5rem"
                        maxHeight="1.5rem"
                        width="100%"
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body" size="large">
                      SUI
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body" size="large" textAlign="center">
                {formatDollars(123435)}
              </Typography>
              <Typography variant="body" size="large" textAlign="center">
                {formatDollars(1234456)}
              </Typography>
              <Typography variant="body" size="large" textAlign="center">
                {formatDollars(123445)}
              </Typography>
            </TableRow>
          </Box>
        );
      })}
    </>
  ) : (
    <>
      <Skeleton height="2rem" width="100%" />
      <Skeleton height="2rem" width="100%" style={{ marginTop: '1rem' }} />
    </>
  );
};

export default TopPoolsTableBody;

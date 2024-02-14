import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { getMetric } from '@/api/metrics';
import { formatDollars, formatMoney } from '@/utils';

import { TOP_INFO_CARDS_DATA } from '../metrics.data';
import InfoCards from './stats-card';

const StatsCardsList: FC = () => {
  const [data, setData] = useState<[]>();

  useEffect(() => {
    getMetric('get-overview').then(setData);
  }, []);
  return (
    <Box
      width="100%"
      gap="s"
      display={['flex', 'flex', 'flex', 'grid']}
      flexDirection={['column', 'row', 'row', 'row']}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      {TOP_INFO_CARDS_DATA.map(({ Icon, description, money }, index) => (
        <InfoCards
          key={v4()}
          Icon={Icon}
          description={description}
          amount={(money ? formatDollars : formatMoney)(
            data?.[index] ?? 0
          ).toString()}
          loading={!data?.length}
        />
      ))}
    </Box>
  );
};

export default StatsCardsList;

import { Box } from '@interest-protocol/ui-kit';
import { getMetric } from 'api/metrics';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { formatDollars, formatMoney } from '@/utils';

import { TOP_INFO_CARDS_DATA } from '../metrics.data';
import TopInfoCards from './info-card';

const InfoCardsList: FC = () => {
  const [data, setData] = useState<[]>();

  useEffect(() => {
    getMetric('get-overview').then(setData);
  }, []);

  return (
    <Box
      gridColumn="1/-1"
      width="100%"
      gap="s"
      display={['flex', 'flex', 'flex', 'grid']}
      flexDirection={['column', 'column', 'column', 'row']}
      gridTemplateColumns="repeat(3, 1fr)"
    >
      {TOP_INFO_CARDS_DATA.map(({ Icon, description, money }, index) => (
        <TopInfoCards
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

export default InfoCardsList;

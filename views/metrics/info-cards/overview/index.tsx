import { InfoCard, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { InfoCardProps } from './info-cards.types';

const Overview: FC<InfoCardProps> = ({
  Icon,
  description,
  amount,
  loading,
}) => (
  <>
    <InfoCard
      title={description}
      Icon={<Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />}
      width={['32rem', '32rem', '32rem', '100%']}
    >
      {loading ? (
        <Skeleton width="40%" />
      ) : (
        <Typography size="large" variant="title">
          {description === 'Pools' ? parseInt(amount).toFixed() : amount}
        </Typography>
      )}
    </InfoCard>
  </>
);

export default Overview;

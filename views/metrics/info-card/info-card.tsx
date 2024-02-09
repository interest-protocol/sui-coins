import { Box, InfoCard, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { InfoCardProps } from './info-card.types';

const InfoCards: FC<InfoCardProps> = ({
  Icon,
  description,
  amount,
  loading,
}) => (
  <Box borderRadius="xs" bg="onPrimary">
    <InfoCard
      title={description}
      Icon={
        <Box
          color="onSurface"
          display="flex"
          p="2xs"
          width="2.5rem"
          height="2.5rem"
          borderRadius="50%"
          bg="lowContainer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      }
      width={['18rem', '18rem', '18rem', '100%']}
    >
      {loading ? (
        <Skeleton width="40%" />
      ) : (
        <Typography size="large" variant="title">
          {amount}
        </Typography>
      )}
    </InfoCard>
  </Box>
);

export default InfoCards;

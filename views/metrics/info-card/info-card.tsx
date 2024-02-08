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
  <InfoCard
    title={
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="m"
      >
        <Typography size="small" variant="label">
          {description}
        </Typography>
        <Box
          color="surface"
          display="flex"
          p="2xs"
          width="1.3rem"
          height="1.3rem"
          borderRadius="50%"
          bg="lowContainer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Box>
      </Box>
    }
    width={['18rem', '18rem', '18rem', '100%']}
  >
    {loading ? (
      <Skeleton width="40%" />
    ) : (
      <Typography size="small" variant="label" color="container">
        {amount}
      </Typography>
    )}
  </InfoCard>
);

export default InfoCards;

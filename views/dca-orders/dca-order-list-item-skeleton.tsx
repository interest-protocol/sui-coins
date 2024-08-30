import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import type { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

const DCAOrderListItemSkeleton: FC = () => (
  <>
    <Box overflow="hidden" display={['none', 'none', 'none', 'block']}>
      <Box
        p="m"
        zIndex="1"
        key={v4()}
        display="grid"
        borderRadius="xs"
        alignItems="center"
        position="relative"
        bg="lowestContainer"
        justifyItems="center"
        gridTemplateColumns="1.25rem 1fr 1fr 1fr 1fr 1fr 1fr"
      >
        <Skeleton width="1rem" />
        <Box display="flex" flexDirection="column" gap="xs" alignItems="center">
          <Skeleton
            width="1.5rem"
            height="1.5rem"
            style={{ borderRadius: '50%' }}
          />
          <Skeleton width="2rem" />
        </Box>
        <Box display="flex" flexDirection="column" gap="xs" alignItems="center">
          <Skeleton
            width="1.5rem"
            height="1.5rem"
            style={{ borderRadius: '50%' }}
          />
          <Skeleton width="2rem" />
        </Box>
        <Skeleton width="3rem" />
        <Skeleton width="5rem" />
        <Skeleton width="9rem" />
        <Skeleton width="1.5rem" />
      </Box>
    </Box>
    <Box overflow="hidden" display={['block', 'block', 'block', 'none']}>
      <Box
        py="xl"
        px="xs"
        gap="s"
        zIndex="1"
        key={v4()}
        display="flex"
        borderRadius="xs"
        position="relative"
        alignItems="stretch"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box
          p="m"
          display="grid"
          borderRadius="s"
          border="1px solid"
          alignItems="stretch"
          justifyItems="center"
          borderColor="outlineVariant"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Pay with
            </Typography>
            <Box
              gap="xs"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Skeleton
                width="1.5rem"
                height="1.5rem"
                style={{ borderRadius: '50%' }}
              />
              <Skeleton width="2rem" />
            </Box>
          </Box>
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Get
            </Typography>
            <Box
              gap="xs"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Skeleton
                width="1.5rem"
                height="1.5rem"
                style={{ borderRadius: '50%' }}
              />
              <Skeleton width="2rem" />
            </Box>
          </Box>
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Orders
            </Typography>
            <Skeleton width="3rem" />
          </Box>
        </Box>
        <Box
          p="m"
          display="grid"
          borderRadius="s"
          border="1px solid"
          alignItems="stretch"
          justifyItems="center"
          borderColor="outlineVariant"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Amount
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap="xs"
            >
              <Skeleton width="7rem" />
            </Box>
          </Box>
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Status
            </Typography>
            <Skeleton width="3rem" />
          </Box>
          <Box
            gap="m"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="label" size="large">
              Actions
            </Typography>
            <Skeleton width="5rem" />
          </Box>
        </Box>
        <Button gap="xl" variant="filled" justifyContent="center">
          <Skeleton width="9rem" />
        </Button>
      </Box>
    </Box>
  </>
);

export default DCAOrderListItemSkeleton;

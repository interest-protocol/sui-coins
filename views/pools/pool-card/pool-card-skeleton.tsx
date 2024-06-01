import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { ArrowObliqueSVG } from '@/svg';

const PoolCardSkeleton: FC = () => (
  <Box
    p="m"
    flex="1"
    gap="xs"
    height="100%"
    display="flex"
    borderRadius="xs"
    bg="lowestContainer"
    flexDirection="column"
    border="0.063rem solid"
    borderColor="outlineVariant"
    justifyContent="space-between"
    transition="all 300ms ease-in-out"
    nHover={{
      cursor: 'pointer',
      borderColor: '#76767A',
      boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
      '.arrow-wrapper': { opacity: 1 },
    }}
  >
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" flexWrap="wrap" alignItems="center">
        {Array.from({ length: 2 }, () => (
          <Tag
            key={v4()}
            px="0"
            py="0"
            mb="2xs"
            mr="2xs"
            size="small"
            height="1.4rem"
            variant="outline"
          >
            <Typography size="small" variant="label">
              <Skeleton height="100%" width="4rem" />
            </Typography>
          </Tag>
        ))}
      </Box>
      <Button
        mb="auto"
        isIcon
        opacity="0"
        variant="text"
        color="onSurface"
        className="arrow-wrapper"
        nHover={{ bg: 'surface' }}
      >
        <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
      </Button>
    </Box>
    <Box
      my="xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        mb="m"
        gap="m"
        display="flex"
        height="2.5rem"
        alignItems="center"
        alignSelf="stretch"
        justifyContent="center"
      >
        {Array.from({ length: 2 }, () => (
          <TokenIcon
            withBg
            type=""
            symbol=""
            key={v4()}
            network={Network.MAINNET}
          />
        ))}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          size="small"
          variant="body"
          fontSize="1rem"
          fontWeight="700"
          lineHeight="1.7rem"
          color="onSurface"
        >
          <Skeleton height="100%" width="7rem" />
        </Typography>
      </Box>
    </Box>
    <Box px="m" py="xs" bg="surface" borderRadius="1rem">
      {Array.from({ length: 2 }, (_, index) => (
        <Box
          py="xs"
          key={v4()}
          display="flex"
          borderTop="1px solid"
          justifyContent="space-between"
          borderColor={index ? 'outlineVariant' : 'transparent'}
        >
          <Typography
            size="medium"
            color="outline"
            variant="body"
            textTransform="capitalize"
          >
            <Skeleton height="100%" width="7rem" />
          </Typography>
          <Box display="flex" gap="xs" alignItems="center">
            <Typography color="onSurface" size="medium" variant="body">
              <Skeleton height="100%" width="7rem" />
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default PoolCardSkeleton;

import { Box, Typography } from '@interest-protocol/ui-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import ProgressBar from '@/components/progress-bar';
import { Routes, RoutesEnum } from '@/constants';
import { DCA } from '@/hooks/use-dca/use-dca.types';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ChevronRightSVG } from '@/svg';
import { fetchCoinMetadata, formatMoney, isSameStructTag } from '@/utils';

const DCAOrderListMiniItem: FC<DCA> = ({
  id,
  input,
  output,
  totalOrders,
  inputBalance,
  remainingOrders,
}) => {
  const { push } = useRouter();

  const coinsType: [string, string] = [input.name, output.name];

  const network = useNetwork();
  const [[tokenIn, tokenOut], setCoins] = useState<
    [CoinMetadataWithType | null, CoinMetadataWithType | null]
  >([null, null]);

  const statusPercentage =
    ((totalOrders - remainingOrders) / totalOrders) * 100;

  useEffect(() => {
    fetchCoinMetadata({
      network,
      types: coinsType.map(normalizeStructTag),
    }).then((data) =>
      setCoins(
        coinsType.map(
          (type) => data.find((item) => isSameStructTag(item.type, type))!
        ) as [CoinMetadataWithType, CoinMetadataWithType]
      )
    );
  }, []);

  if (!tokenIn || !tokenOut)
    return (
      <Box
        p="s"
        gap="m"
        key={v4()}
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        justifyContent="space-between"
        nHover={{ borderColor: 'primary' }}
        gridTemplateColumns="3fr 2fr 2fr 2rem"
        display={['flex', 'flex', 'flex', 'grid']}
        onClick={() => push(`${Routes[RoutesEnum.DCAOrders]}?id=${0x0}`)}
      >
        <Box
          gap="xs"
          alignItems="center"
          display={['none', 'none', 'flex', 'flex', 'flex']}
        >
          <Box display="flex" gap="xs" alignItems="center">
            <Box width="1rem">
              <Skeleton width="100%" height="1rem" />
            </Box>
            <Box width={['4rem', '5rem', '5rem', '4rem']}>
              <Skeleton width="100%" height="1rem" />
            </Box>
          </Box>
          <Box
            gap="xs"
            alignItems="center"
            display={['none', 'none', 'flex', 'flex']}
          >
            <Box width="1rem">
              <Skeleton width="100%" height="1rem" />
            </Box>
            <Box width={['4rem', '5rem', '5rem', '4rem']}>
              <Skeleton width="100%" height="1rem" />
            </Box>
          </Box>
        </Box>
        <Box width={['20%', '40%', '40%', '6rem']}>
          <Skeleton width="100%" height="1rem" />
        </Box>
        <Box width={['80%', '80%', '40%', '8rem']}>
          <Skeleton width="100%" />
        </Box>
        <ChevronRightSVG width="1.3rem" maxWidth="1.3rem" maxHeight="1.3rem" />
      </Box>
    );

  return (
    <Box
      p="s"
      gap="m"
      key={v4()}
      borderRadius="xs"
      border="1px solid"
      alignItems="center"
      borderColor="outlineVariant"
      display={['flex', 'flex', 'grid']}
      justifyContent="space-between"
      nHover={{ borderColor: 'primary' }}
      gridTemplateColumns="3fr 2fr 2fr 2rem"
      onClick={() => push(`${Routes[RoutesEnum.DCAOrders]}?id=${id}`)}
    >
      <Box
        gap={['2xs', '2xs', 'xs']}
        display="flex"
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        <Box display="flex" gap="xs" alignItems="center">
          <TokenIcon
            withBg
            rounded
            size="1rem"
            loaderSize={16}
            network={network}
            type={tokenIn.type}
            url={tokenIn.iconUrl}
            symbol={tokenIn.symbol}
          />
          <Typography variant="body" size="medium">
            {tokenIn.symbol}
          </Typography>
        </Box>
        <Box as="span" rotate={['90deg', '90deg', '0deg']}>
          <ChevronRightSVG width="100%" maxWidth="1.3rem" maxHeight="1.3rem" />
        </Box>
        <Box display="flex" gap="xs" alignItems="center">
          <TokenIcon
            withBg
            rounded
            size="1rem"
            loaderSize={16}
            network={network}
            type={tokenOut.type}
            url={tokenOut.iconUrl}
            symbol={tokenOut.symbol}
          />
          <Typography variant="body" size="medium">
            {tokenOut.symbol}
          </Typography>
        </Box>
      </Box>
      <Box
        display={['flex', 'flex', 'none']}
        flexDirection={['column', 'column', 'row']}
        gap="s"
      >
        <Typography variant="body" size="medium" fontWeight="bold">
          {formatMoney(
            FixedPointMath.toNumber(BigNumber(inputBalance), tokenIn.decimals)
          )}{' '}
          {tokenIn.symbol}
        </Typography>
        <Box>
          <ProgressBar color="primary" value={statusPercentage} />
        </Box>
      </Box>
      <Typography
        variant="body"
        size="medium"
        fontWeight="bold"
        display={['none', 'none', 'block']}
      >
        {formatMoney(
          FixedPointMath.toNumber(BigNumber(inputBalance), tokenIn.decimals)
        )}{' '}
        {tokenIn.symbol}
      </Typography>
      <Box display={['none', 'none', 'block']}>
        <ProgressBar color="primary" value={statusPercentage} />
      </Box>
      <ChevronRightSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Box>
  );
};

export default DCAOrderListMiniItem;

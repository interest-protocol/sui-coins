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
import { useDcaOrders } from '@/hooks/use-dca';
import { DCA } from '@/hooks/use-dca/use-dca.types';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ChevronRightSVG } from '@/svg';
import { fetchCoinMetadata, formatMoney, isSameStructTag } from '@/utils';

const DCAOrderListMiniItem: FC<DCA> = ({
  id,
  input,
  active,
  output,
  isTrading,
  inputBalance,
  remainingOrders,
}) => {
  const { push } = useRouter();

  const coinsType: [string, string] = [input.name, output.name];

  const network = useNetwork();
  const { data: dcaOrders, isLoading } = useDcaOrders(id, active);
  const [[tokenIn, tokenOut], setCoins] = useState<
    [CoinMetadataWithType | null, CoinMetadataWithType | null]
  >([null, null]);

  const totalOrders =
    remainingOrders + (dcaOrders?.totalItems ?? 0) + (isTrading ? 1 : 0);

  const statusPercentage = dcaOrders
    ? (dcaOrders.data.length / totalOrders) * 100
    : 0;

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

  if (isLoading || !tokenIn || !tokenOut)
    return (
      <Box
        p="s"
        gap="m"
        key={v4()}
        display="grid"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        nHover={{ borderColor: 'primary' }}
        gridTemplateColumns="3fr 2fr 2fr 2rem"
        onClick={() => push(`${Routes[RoutesEnum.DCAOrders]}?id=${0x0}`)}
      >
        <Box display="flex" gap="xs" alignItems="center">
          <Box display="flex" gap="2xs" alignItems="center">
            <Skeleton width="1rem" height="1rem" />
            <Skeleton width="4rem" height="1rem" />
          </Box>
          <ChevronRightSVG width="100%" maxWidth="1.3rem" maxHeight="1.3rem" />
          <Box display="flex" gap="2xs" alignItems="center">
            <Skeleton width="1rem" height="1rem" />
            <Skeleton width="4rem" height="1rem" />
          </Box>
        </Box>
        <Typography variant="body" size="medium" fontWeight="bold">
          <Skeleton width="5rem" height="1rem" />
        </Typography>
        <Box>
          <Skeleton width="7rem" />
        </Box>
        <ChevronRightSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
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

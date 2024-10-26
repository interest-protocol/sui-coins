import { TimeScale } from '@interest-protocol/dca-sdk';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { not } from 'ramda';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import LinearChart from '@/components/linear-chart';
import { EXPLORER_URL, LOCAL_STORAGE_VERSION } from '@/constants';
import { MAX_U64 } from '@/constants/dca';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { EyeSVG, IncineratorNoAssetsSVG, LinkSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import { useDCAState } from '../dca-orders-manager';

const DCAOrderDetailsOrders: FC = () => {
  const network = useNetwork();
  const [isOpen, setOpen] = useLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-dca-chart`,
    true
  );
  const { detailedDcas, coinsMetadata, selectedId, dcaOrders } = useDCAState();

  const {
    max,
    min,
    input,
    output,
    timeScale,
    totalOrders,
    amountPerTrade,
    remainingOrders,
  } = detailedDcas[selectedId!];

  const tokenIn = coinsMetadata[input];
  const tokenOut = coinsMetadata[output];

  const orderPrices = dcaOrders.map(({ output_amount, timestampMs }) => {
    if (!(tokenIn && tokenOut)) return { valueIn: 0, price: 0, time: 0 };

    const price = FixedPointMath.toNumber(
      BigNumber(output_amount).div(
        FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
      ),
      tokenOut.decimals
    );

    return {
      price: Number(+(+price.toFixed(tokenOut.decimals)).toPrecision()),
      time: timestampMs,
    };
  });

  const maxPrice =
    tokenOut && tokenIn && max !== MAX_U64
      ? FixedPointMath.toNumber(
          BigNumber(max).div(
            FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
          ),
          tokenOut.decimals
        )
      : null;

  const minPrice =
    tokenOut && tokenIn && Number(min)
      ? FixedPointMath.toNumber(
          BigNumber(min).div(
            FixedPointMath.toNumber(BigNumber(amountPerTrade), tokenIn.decimals)
          ),
          tokenOut.decimals
        )
      : null;

  return (
    <>
      <Box
        gap="m"
        bg="surface"
        display="flex"
        borderRadius="xs"
        p={['s', 's', 'l']}
        flexDirection="column"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="label" size="large">
            PERFORMANCE OVERVIEW
          </Typography>
          <Button
            px="m"
            py="xs"
            variant="text"
            color="primary"
            onClick={() => setOpen(not)}
            SuffixIcon={
              <EyeSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            }
          >
            {isOpen ? 'Hide' : 'Show'}
            <Typography
              as="span"
              size="large"
              variant="label"
              display={['none', 'none', 'inline']}
            >
              {' '}
              Chart
            </Typography>
          </Button>
        </Box>
        <Box
          gap="s"
          display="grid"
          gridTemplateColumns={['1fr', '1fr', '1fr', '1fr', '2fr 1fr']}
        >
          {isOpen && (
            <Box
              px="m"
              pt="l"
              pb="xs"
              gap="l"
              display="flex"
              borderRadius="xs"
              bg="lowestContainer"
              flexDirection="column"
              gridColumn={['1/-1', '1/-1', '1/-1', '1/-1', 'unset']}
            >
              <LinearChart
                data={orderPrices.toReversed().map(({ time, price }) => ({
                  amount: price,
                  day: new Date(time)[
                    timeScale > TimeScale.Day
                      ? 'toLocaleDateString'
                      : 'toLocaleTimeString'
                  ](),
                  description: new Date(time).toLocaleString(),
                }))}
              />
            </Box>
          )}
          <Box
            p="l"
            gap="l"
            display="flex"
            borderRadius="xs"
            bg="lowestContainer"
            flexDirection="column"
            gridColumn={isOpen ? 'unset' : '1/-1'}
          >
            <Typography variant="label" size="medium">
              Order details
            </Typography>
            <Box display="flex" flexDirection="column" px="m">
              <Box display="flex" justifyContent="space-between" py="s">
                <Typography variant="body" size="small" color="outline">
                  Min Price
                </Typography>
                <Typography variant="body" size="small">
                  {minPrice ? formatMoney(minPrice, undefined, true) : 'N/A'}
                </Typography>
              </Box>
              <Box
                py="s"
                display="flex"
                borderTop="1px solid"
                borderColor="outlineVariant"
                justifyContent="space-between"
              >
                <Typography variant="body" size="small" color="outline">
                  Max Price
                </Typography>
                <Typography variant="body" size="small">
                  {maxPrice ? formatMoney(maxPrice, undefined, true) : 'N/A'}
                </Typography>
              </Box>
              <Box
                py="s"
                display="flex"
                borderTop="1px solid"
                borderColor="outlineVariant"
                justifyContent="space-between"
              >
                <Typography variant="body" size="small" color="outline">
                  Average Price
                </Typography>
                <Typography variant="body" size="small">
                  {orderPrices.length
                    ? `${formatMoney(
                        orderPrices.reduce((acc, { price }) => price + acc, 0) /
                          orderPrices.length,
                        1,
                        true
                      )} ${tokenOut?.symbol}`
                    : 'N/A'}
                </Typography>
              </Box>
              <Box
                py="s"
                display="flex"
                borderTop="1px solid"
                borderColor="outlineVariant"
                justifyContent="space-between"
              >
                <Typography variant="body" size="small" color="outline">
                  # of orders
                </Typography>
                <Typography variant="body" size="small">
                  {totalOrders - remainingOrders}/{totalOrders}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        p="m"
        gap="m"
        bg="surface"
        display="flex"
        borderRadius="xs"
        flexDirection="column"
      >
        <Box
          p="m"
          display="grid"
          alignItems="center"
          justifyItems="center"
          gridTemplateColumns={[
            '1fr 1fr 2fr',
            '1fr 1fr 2fr',
            '1fr 1fr 1fr 1fr 1fr',
          ]}
        >
          <Typography variant="label" size="large" justifySelf="self-start">
            From
          </Typography>
          <Typography
            size="large"
            variant="label"
            display={['none', 'none', 'block']}
          >
            Rate
          </Typography>
          <Typography variant="label" size="large">
            To
          </Typography>
          <Typography variant="label" size="large">
            Date/Time
          </Typography>
          <Box />
        </Box>
        {dcaOrders.length ? (
          <Box
            gap="s"
            height="20rem"
            display="flex"
            overflowY="auto"
            flexDirection="column"
          >
            {dcaOrders.map(
              ({
                digest,
                timestampMs,
                input_price,
                output_price,
                input_amount,
                output_amount,
              }) => (
                <Box
                  p="m"
                  key={v4()}
                  display="grid"
                  borderRadius="xs"
                  border="1px solid"
                  alignItems="center"
                  bg="lowestContainer"
                  justifyItems="center"
                  borderColor="outlineVariant"
                  gridTemplateColumns={[
                    '1fr 1fr 2fr',
                    '1fr 1fr 2fr',
                    '1fr 1fr 1fr 1fr 1fr',
                  ]}
                >
                  <Box display="flex" flexDirection="column">
                    <Box
                      gap="s"
                      display="flex"
                      alignItems="center"
                      justifySelf="self-start"
                      flexDirection={['column-reverse', 'row']}
                    >
                      <Typography variant="body" size="medium">
                        {formatMoney(
                          FixedPointMath.toNumber(
                            BigNumber(input_amount),
                            tokenIn?.decimals
                          )
                        )}
                      </Typography>
                      <Box display="flex">
                        <TokenIcon
                          withBg
                          rounded
                          size="0.75rem"
                          network={network}
                          type={tokenIn?.type ?? ''}
                          symbol={tokenIn?.symbol ?? ''}
                        />
                      </Box>
                    </Box>
                    {input_price && (
                      <Typography variant="body" size="small" color="outline">
                        {formatDollars(
                          FixedPointMath.toNumber(
                            BigNumber(input_amount).times(input_price),
                            tokenIn?.decimals
                          )
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Box display={['none', 'none', 'block']}>
                    <Typography variant="body" size="medium">
                      {FixedPointMath.toNumber(
                        BigNumber(output_amount).div(
                          FixedPointMath.toNumber(
                            BigNumber(input_amount),
                            tokenIn?.decimals
                          )
                        ),
                        tokenOut?.decimals
                      )}
                    </Typography>
                    {input_price && output_price && (
                      <Typography variant="body" size="small" color="outline">
                        {formatDollars(
                          FixedPointMath.toNumber(
                            BigNumber(input_amount).times(input_price),
                            tokenIn?.decimals
                          ) /
                            FixedPointMath.toNumber(
                              BigNumber(output_amount).times(output_price),
                              tokenOut?.decimals
                            )
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Box
                      gap="s"
                      display="flex"
                      alignItems="center"
                      flexDirection={['column-reverse', 'row']}
                    >
                      <Typography variant="body" size="medium">
                        {formatMoney(
                          FixedPointMath.toNumber(
                            BigNumber(output_amount),
                            tokenOut?.decimals
                          )
                        )}
                      </Typography>
                      <Box display="flex">
                        <TokenIcon
                          withBg
                          rounded
                          size="0.75rem"
                          network={network}
                          type={tokenOut?.type ?? ''}
                          symbol={tokenOut?.symbol ?? ''}
                        />
                      </Box>
                    </Box>
                    {output_price && (
                      <Typography variant="body" size="small" color="outline">
                        {formatDollars(
                          FixedPointMath.toNumber(
                            BigNumber(output_amount).times(output_price),
                            tokenOut?.decimals
                          )
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body" size="medium" textAlign="right">
                    {new Date(timestampMs).toLocaleString()}
                  </Typography>
                  <Box>
                    <Link href={`${EXPLORER_URL[network]}/tx/${digest}`}>
                      <Button
                        isIcon
                        variant="text"
                        color="primary"
                        justifySelf="self-end"
                      >
                        <LinkSVG
                          width="100%"
                          maxWidth="1rem"
                          maxHeight="1rem"
                        />
                      </Button>
                    </Link>
                  </Box>
                </Box>
              )
            )}
          </Box>
        ) : (
          <Box
            gap="s"
            height="20rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              gap="s"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <IncineratorNoAssetsSVG
                maxHeight="7.375rem"
                maxWidth="6.625rem"
                width="100%"
              />
              <Typography variant="label" size="medium">
                You don’t have orders
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DCAOrderDetailsOrders;

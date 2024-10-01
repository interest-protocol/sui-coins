import { Chain } from '@interest-protocol/sui-tokens';
import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import useSWR from 'swr';

import { Network } from '@/constants';
import {
  STRICT_TOKENS_MAP,
  SUI_BRIDGE_TOKENS,
  TOKEN_ICONS,
  WORMHOLE_TOKENS,
} from '@/constants/coins';
import {
  ARBChainSVG,
  AVAXChainSVG,
  BadgeSVG,
  BSCChainSVG,
  BTCChainSVG,
  DefaultSVG,
  ETHChainSVG,
  MATICChainSVG,
  SOLChainSVG,
} from '@/svg';
import { fetchCoinMetadata } from '@/utils';

import FTMChain from '../svg/ftm-chain';
import { SVGProps } from '../svg/svg.types';
import { TokenIconProps } from './token-icon.types';

const CHAIN_ICON: Record<Chain, FC<SVGProps>> = {
  BSC: BSCChainSVG,
  ETH: ETHChainSVG,
  SOL: SOLChainSVG,
  AVAX: AVAXChainSVG,
  ARB: ARBChainSVG,
  BTC: BTCChainSVG,
  FTM: FTMChain,
  MATIC: MATICChainSVG,
};

const TokenIcon: FC<TokenIconProps> = ({
  url,
  type,
  symbol,
  withBg,
  simple,
  network,
  rounded,
  size = '1.5rem',
  loaderSize = 16,
}) => {
  const isMainnet = network === Network.MAINNET;
  const TokenIcon = TOKEN_ICONS[network]?.[isMainnet ? type : symbol] ?? null;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const stopLoading = () => setLoading(false);
  const onLoadError = () => setLoadError(true);

  const { data: iconSrc, isLoading } = useSWR(
    `${network}-${type}-${url}`,
    async () => {
      if (TokenIcon || url)
        return STRICT_TOKENS_MAP[network][type].logoUrl ?? null;

      if (STRICT_TOKENS_MAP[network][type].logoUrl)
        return STRICT_TOKENS_MAP[network][type].logoUrl;

      if (STRICT_TOKENS_MAP[network][type].logoUrl)
        return STRICT_TOKENS_MAP[network][type].logoUrl;

      const data = await fetchCoinMetadata({ network, type });
      return data.iconUrl;
    }
  );

  const chain =
    STRICT_TOKENS_MAP[network][type]?.chain ??
    WORMHOLE_TOKENS[network].find((token) => token.type === type)?.chain ??
    SUI_BRIDGE_TOKENS[network].find((token) => token.type === type)?.chain;

  const ChainIcon = chain ? CHAIN_ICON[chain] : null;

  if (loadError)
    return (
      <Box
        display="flex"
        overflow="hidden"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
        {...(withBg && { bg: 'black', color: 'white' })}
      >
        <DefaultSVG
          width="100%"
          maxWidth={size ?? '1.5rem'}
          maxHeight={size ?? '1.5rem'}
        />
      </Box>
    );

  if (TokenIcon && typeof TokenIcon === 'string')
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
      >
        <Box
          overflow="hidden"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          {loading && (
            <Box position="absolute" top="-0.5rem" left="0.9rem">
              <ProgressIndicator size={16} variant="loading" />
            </Box>
          )}
          <img
            alt={symbol}
            width="100%"
            height="100%"
            src={TokenIcon}
            onLoad={stopLoading}
            onError={onLoadError}
            style={{ objectFit: 'cover', position: 'relative' }}
          />
        </Box>
        {STRICT_TOKENS_MAP[network][type] && (
          <Box
            top="-0.5rem"
            right="-0.25rem"
            overflow="hidden"
            position="absolute"
          >
            <BadgeSVG maxHeight="0.75rem" maxWidth="0.75rem" width="100%" />
          </Box>
        )}
        {!simple && ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            position="absolute"
            overflow="hidden"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  if (TokenIcon)
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          overflow="hidden"
          position="relative"
          alignItems="center"
          justifyContent="center"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
          {...(withBg && { bg: 'black', color: 'white' })}
        >
          <TokenIcon
            width="100%"
            maxWidth={size ?? '1.5rem'}
            maxHeight={size ?? '1.5rem'}
          />
        </Box>
        {STRICT_TOKENS_MAP[network][type] && (
          <Box
            top="-0.5rem"
            right="-0.25rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <BadgeSVG maxHeight="0.75rem" maxWidth="0.75rem" width="100%" />
          </Box>
        )}
        {!simple && ChainIcon && (
          <Box
            position="absolute"
            bottom="-0.3rem"
            right="-0.5rem"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  if (url)
    return (
      <Box
        bg="black"
        color="white"
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
      >
        <Box
          overflow="hidden"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          {loading && (
            <Box
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              width={`calc(${size} * 1.66)`}
              height={`calc(${size} * 1.66)`}
            >
              <ProgressIndicator
                size={loaderSize}
                variant="loading"
                onLoad={stopLoading}
              />
            </Box>
          )}
          <img
            src={url}
            alt={symbol}
            width="100%"
            height="100%"
            onLoad={stopLoading}
            onError={onLoadError}
            style={{ objectFit: 'cover', position: 'relative' }}
          />
          {STRICT_TOKENS_MAP[network][type] && (
            <Box
              top="-0.5rem"
              right="-0.25rem"
              overflow="hidden"
              position="absolute"
              borderRadius="full"
            >
              <BadgeSVG maxHeight="0.75rem" maxWidth="0.75rem" width="100%" />
            </Box>
          )}
        </Box>
      </Box>
    );

  if (isLoading || iconSrc)
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
      >
        <Box
          overflow="hidden"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          {(isLoading || loading) && (
            <Box position="absolute" top="-0.5rem" left="0.9rem">
              <ProgressIndicator size={16} variant="loading" />
            </Box>
          )}
          {iconSrc && (
            <img
              alt={symbol}
              width="100%"
              height="100%"
              src={iconSrc}
              onLoad={stopLoading}
              onError={onLoadError}
              style={{ objectFit: 'cover', position: 'relative' }}
            />
          )}
        </Box>
        {STRICT_TOKENS_MAP[network][type] && (
          <Box
            top="-0.5rem"
            right="-0.25rem"
            overflow="hidden"
            position="absolute"
            borderRadius="full"
          >
            <BadgeSVG maxHeight="0.75rem" maxWidth="0.75rem" width="100%" />
          </Box>
        )}
        {!simple && ChainIcon && (
          <Box
            right="-0.5rem"
            bottom="-0.3rem"
            position="absolute"
            borderRadius="full"
          >
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

  return (
    <Box
      bg="black"
      color="white"
      display="flex"
      overflow="hidden"
      position="relative"
      alignItems="center"
      justifyContent="center"
      width={`calc(${size} * 1.66)`}
      height={`calc(${size} * 1.66)`}
      borderRadius={rounded || !withBg ? 'full' : 'xs'}
    >
      <DefaultSVG
        width="100%"
        maxWidth={size ?? '1.5rem'}
        maxHeight={size ?? '1.5rem'}
      />
    </Box>
  );
};

export default TokenIcon;

import { Chain } from '@interest-protocol/sui-tokens';
import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import useSWR from 'swr';

import { Network } from '@/constants';
import {
  CELER_TOKENS,
  STRICT_TOKENS_MAP,
  TOKEN_ICONS,
  WORMHOLE_TOKENS,
} from '@/constants/coins';
import {
  ARBChainSVG,
  AVAXChainSVG,
  BSCChainSVG,
  BTCChainSVG,
  DefaultSVG,
  ETHChainSVG,
  MATICChainSVG,
  SOLChainSVG,
} from '@/svg';

import FTMChain from '../svg/ftm-chain';
import { SVGProps } from '../svg/svg.types';
import { TokenIconProps, TypeBasedIcon } from './token-icon.types';
import { isTypeBased } from './token-icons.utils';

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

const TokenIcon: FC<TokenIconProps> = (props) => {
  const {
    type,
    symbol,
    withBg,
    network,
    rounded,
    size = '1.5rem',
    loaderSize = 16,
  } = {
    type: '',
    withBg: '',
    network: '',
    rounded: '',
    loaderSize: 16,
    size: '1.5rem',
    ...props,
  } as TypeBasedIcon;

  const isMainnet = network === Network.MAINNET;
  const TokenIcon = TOKEN_ICONS[network]?.[isMainnet ? type : symbol] ?? null;

  const { data: iconSrc, isLoading } = useSWR(
    `${network}-${type}`,
    async () => {
      if ((TokenIcon && isMainnet) || !isTypeBased(props)) return null;

      const data = await fetch(
        `/api/auth/v1/coin-metadata?network=${network}&type=${type}`
      ).then((res) => res.json());

      return data.iconUrl;
    }
  );

  if (!isTypeBased(props))
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
        {...(!props.url && { bg: 'black', color: 'white' })}
      >
        {props.url ? (
          <Box
            overflow="hidden"
            width={`calc(${size} * 1.66)`}
            height={`calc(${size} * 1.66)`}
            borderRadius={rounded ? 'full' : 'xs'}
          >
            <Box
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              width={`calc(${size} * 1.66)`}
              height={`calc(${size} * 1.66)`}
            >
              <ProgressIndicator size={loaderSize} variant="loading" />
            </Box>
            <img
              alt={symbol}
              width="100%"
              src={props.url}
              style={{ position: 'relative' }}
            />
          </Box>
        ) : (
          <DefaultSVG
            width="100%"
            maxWidth={size ?? '1.5rem'}
            maxHeight={size ?? '1.5rem'}
          />
        )}
      </Box>
    );

  const chain =
    STRICT_TOKENS_MAP[network][type]?.chain ??
    WORMHOLE_TOKENS[network].find((token) => token.type === type)?.chain ??
    CELER_TOKENS[network].find((token) => token.type === type)?.chain;

  const ChainIcon = chain ? CHAIN_ICON[chain] : null;

  if (!TokenIcon && !iconSrc && !isLoading)
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

  if ((!TokenIcon && (isLoading || iconSrc)) || typeof TokenIcon === 'string')
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
          {isLoading && (
            <Box position="absolute" top="-0.5rem" left="0.9rem">
              <ProgressIndicator size={16} variant="loading" />
            </Box>
          )}
          {(iconSrc || TokenIcon) && (
            <img src={TokenIcon ?? iconSrc} width="100%" alt={symbol} />
          )}
        </Box>
        {ChainIcon && (
          <Box position="absolute" bottom="-0.3rem" right="-0.5rem">
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );

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
      {ChainIcon && (
        <Box position="absolute" bottom="-0.3rem" right="-0.5rem">
          <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
        </Box>
      )}
    </Box>
  );
};

export default TokenIcon;

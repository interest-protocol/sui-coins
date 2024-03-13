import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import useSWR from 'swr';

import { Network } from '@/constants';
import { CHAIN_MAP, TOKEN_ICONS } from '@/constants/coins';
import { AVAChainSVG, BSCChainSVG, ETHChainSVG, SOLChainSVG } from '@/svg';

import { TokenIconProps } from './token-icon.types';

const CHAIN_ICON = {
  BSC: BSCChainSVG,
  ETH: ETHChainSVG,
  SOL: SOLChainSVG,
  AVA: AVAChainSVG,
  SUI: null,
};

const TokenIcon: FC<TokenIconProps> = ({
  type,
  withBg,
  symbol,
  network,
  rounded,
  size = '1.5rem',
}) => {
  const isMainnet = network === Network.MAINNET;
  const TokenIcon = TOKEN_ICONS[network][isMainnet ? type : symbol] ?? null;

  const { data: iconSrc, isLoading } = useSWR(
    `${network}-${type}`,
    async () => {
      if (TokenIcon && isMainnet) return null;

      const data = await fetch(
        `/api/v1/coin-metadata?network=${network}&type=${type}`
      ).then((res) => res.json());

      return data.iconUrl;
    }
  );

  const chain = CHAIN_MAP[type];
  const ChainIcon = chain ? CHAIN_ICON[chain] : null;

  if (!TokenIcon && !iconSrc && !isLoading) return null;

  if (!TokenIcon && (isLoading || iconSrc)) {
    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        justifyContent="center"
        width={`calc(${size} * 1.66)`}
        height={`calc(${size} * 1.66)`}
        borderRadius={rounded ? 'full' : 'xs'}
        {...(withBg && { bg: 'black', color: 'white' })}
      >
        <Box
          overflow="hidden"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          {isLoading && (
            <Box position="absolute" top="-0.5rem">
              <ProgressIndicator size={16} variant="loading" />
            </Box>
          )}
          <img src={iconSrc} width="100%" alt="Token Icon" />
        </Box>
        {ChainIcon && (
          <Box position="absolute" bottom="-0.3rem" right="-0.5rem">
            <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      position="relative"
      alignItems="center"
      justifyContent="center"
      width={`calc(${size} * 1.66)`}
      height={`calc(${size} * 1.66)`}
      borderRadius={rounded ? 'full' : 'xs'}
      {...(withBg && { bg: 'black', color: 'white' })}
    >
      {typeof TokenIcon === 'string' ? (
        <Box
          overflow="hidden"
          width={`calc(${size} * 1.66)`}
          height={`calc(${size} * 1.66)`}
          borderRadius={rounded ? 'full' : 'xs'}
        >
          <img src={TokenIcon} width="100%" alt="Token Icon" />
        </Box>
      ) : (
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
      )}
      {ChainIcon && (
        <Box position="absolute" bottom="-0.3rem" right="-0.5rem">
          <ChainIcon maxHeight={size} maxWidth={size} width="100%" />
        </Box>
      )}
    </Box>
  );
};

export default TokenIcon;

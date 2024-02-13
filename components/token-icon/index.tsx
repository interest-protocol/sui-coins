import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TOKEN_ICONS } from '@/constants/coins';
import {
  AVAChainSVG,
  BSCChainSVG,
  DefaultSVG,
  ETHChainSVG,
  SOLChainSVG,
} from '@/svg';

import { TokenIconProps } from './token-icon.types';

const CHAIN_ICON = {
  BSC: BSCChainSVG,
  ETH: ETHChainSVG,
  SOL: SOLChainSVG,
  AVA: AVAChainSVG,
  SUI: null,
};

const TokenIcon: FC<TokenIconProps> = ({
  chain,
  tokenId,
  network,
  maxWidth,
  maxHeight,
}) => {
  if (!tokenId) return null;

  const TokenIcon = TOKEN_ICONS[network][tokenId] ?? DefaultSVG;

  if (!chain)
    return (
      <>
        {typeof TokenIcon === 'string' ? (
          <Box
            borderRadius="xs"
            overflow="hidden"
            width={maxWidth ?? '2.5rem'}
            height={maxHeight ?? '2.5rem'}
          >
            <img src={TokenIcon} width="100%" alt="Token Icon" />
          </Box>
        ) : (
          <TokenIcon
            width="100%"
            maxWidth={maxWidth ?? '1.5rem'}
            maxHeight={maxHeight ?? '1.5rem'}
          />
        )}
      </>
    );

  const ChainIcon = CHAIN_ICON[chain!];

  return (
    <Box
      bg="black"
      color="white"
      display="flex"
      width="2.5rem"
      height="2.5rem"
      borderRadius="xs"
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      {typeof TokenIcon === 'string' ? (
        <Box width="2.5rem" height="2.5rem" borderRadius="xs" overflow="hidden">
          <img src={TokenIcon} width="100%" alt="Token Icon" />
        </Box>
      ) : (
        <TokenIcon
          width="100%"
          maxWidth={maxWidth ?? '1.5rem'}
          maxHeight={maxHeight ?? '1.5rem'}
        />
      )}
      {ChainIcon && (
        <Box position="absolute" bottom="-0.3rem" right="-0.5rem">
          <ChainIcon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
        </Box>
      )}
    </Box>
  );
};

export default TokenIcon;

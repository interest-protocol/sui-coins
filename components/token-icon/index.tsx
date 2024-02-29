import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TOKEN_ICONS } from '@/lib';
import { DefaultSVG } from '@/svg';

import { TokenIconProps } from './token-icon.types';
const TokenIcon: FC<TokenIconProps> = ({
  tokenId,
  network,
  maxWidth,
  maxHeight,
}) => {
  if (!tokenId) return null;

  const TokenIcon = TOKEN_ICONS[network][tokenId] ?? DefaultSVG;

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
};

export default TokenIcon;

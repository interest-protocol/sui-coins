import { FC } from 'react';

import { TOKEN_ICONS } from '@/constants';
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
    <TokenIcon
      width="100%"
      maxWidth={maxWidth ?? '1.5rem'}
      maxHeight={maxHeight ?? '1.5rem'}
    />
  );
};

export default TokenIcon;

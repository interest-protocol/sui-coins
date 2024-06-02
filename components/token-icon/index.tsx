import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import useSWR from 'swr';

import { DefaultTokenSVG } from '@/svg';

import { TOKEN_ICONS } from './token-icon.data';
import { TokenIconProps, TypeBasedIcon } from './token-icon.types';
import { isTypeBased } from './token-icons.utils';

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

  const TokenIcon = TOKEN_ICONS[network]?.[symbol] ?? null;

  const { data: iconSrc, isLoading } = useSWR(
    `${network}-${type}`,
    async () => {
      if (TokenIcon || !isTypeBased(props)) return null;

      const data = await fetch(
        `/api/auth/v1/coin-metadata?network=${network}&type=${type.toLowerCase()}`
      ).then((res) => res.json());

      return data.iconUrl;
    }
  );

  if (!isTypeBased(props))
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
        {...(!props.url && { bg: 'onSurface', color: 'surface' })}
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
          <DefaultTokenSVG
            width="100%"
            maxWidth={size ?? '1.5rem'}
            maxHeight={size ?? '1.5rem'}
          />
        )}
      </Box>
    );

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
        {...(withBg && { bg: 'onSurface', color: 'surface' })}
      >
        <DefaultTokenSVG
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
        {...(withBg && { bg: 'onSurface', color: 'surface' })}
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
        {...(withBg && { bg: 'onSurface', color: 'surface' })}
      >
        <TokenIcon
          width="100%"
          maxWidth={size ?? '1.5rem'}
          maxHeight={size ?? '1.5rem'}
        />
      </Box>
    </Box>
  );
};

export default TokenIcon;

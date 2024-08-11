import { Box, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useSuiNs } from '@/context/suins';
import { UserSVG } from '@/svg';
import { formatSuiNS } from '@/utils';

import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({ isLarge, account, withNameOrAddress }) => {
  const { names, images, loading } = useSuiNs();
  const currentAccount = useCurrentAccount();
  const SIZE = isLarge ? '2.2rem' : '1.5rem';
  const [imgLoading, setImgLoading] = useState(true);

  const localAccount = account ?? currentAccount!.address!;

  const suiNsNames = names[localAccount];
  const src = suiNsNames?.length ? images[suiNsNames[0]] : '';

  return (
    <>
      <Box
        width={SIZE}
        height={SIZE}
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        position="relative"
        alignItems="center"
        bg="primaryContainer"
        justifyContent="center"
        color="onPrimaryContainer"
      >
        {src ? (
          <>
            {imgLoading && (
              <Box width="100%" height="100%" position="absolute">
                <Skeleton width="100%" />
              </Box>
            )}
            <img
              src={src}
              alt="Avatar"
              width="100%"
              onLoad={() => setImgLoading(false)}
            />
          </>
        ) : (
          <UserSVG width="80%" height="80%" maxWidth={SIZE} maxHeight={SIZE} />
        )}
      </Box>
      {withNameOrAddress && (
        <Typography
          variant="label"
          size="large"
          mr="0.5rem"
          width="max-content"
        >
          {loading ? (
            <Skeleton width="100%" />
          ) : src && !!suiNsNames.length ? (
            formatSuiNS(suiNsNames[0])
          ) : localAccount ? (
            formatAddress(localAccount)
          ) : (
            ''
          )}
        </Typography>
      )}
    </>
  );
};

export default Avatar;

import { Box, Typography } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useSuiNs } from '@/context/suins';
import { UserSVG } from '@/svg';

import { getName } from '../wallet/profile/profile.utils';
import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({ isLarge, account, withNameOrAddress }) => {
  const { names, loading } = useSuiNs();
  const { currentAccount } = useWalletKit();
  const SIZE = isLarge ? '2.2rem' : '1.5rem';

  return (
    <>
      <Box
        display="flex"
        width={SIZE}
        height={SIZE}
        alignItems="center"
        borderRadius="full"
        bg="primaryContainer"
        justifyContent="center"
        color="onPrimaryContainer"
      >
        <UserSVG width="80%" height="80%" maxWidth={SIZE} maxHeight={SIZE} />
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
          ) : (
            getName(account ?? currentAccount?.address ?? '', names)
          )}
        </Typography>
      )}
    </>
  );
};

export default Avatar;

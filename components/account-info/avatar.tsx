import { Box, Typography } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import { UserSVG } from '@/svg';

import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({ withNameOrAddress, account, isLarge }) => {
  const { currentAccount } = useWalletKit();
  const address = account?.address ?? (currentAccount?.address || '');

  const SIZE = isLarge ? '2.2rem' : '1.5rem';

  return (
    <>
      <Box
        bg="primary"
        width={SIZE}
        height={SIZE}
        display="flex"
        color="onPrimary"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        <UserSVG width="80%" height="80%" maxWidth={SIZE} maxHeight={SIZE} />
      </Box>
      {withNameOrAddress && (
        <Typography
          variant="label"
          size="large"
          mr="0.5rem"
          width="max-content"
          color="onSurface"
        >
          {address.slice(0, 6)}...{address.slice(-4)}
        </Typography>
      )}
    </>
  );
};

export default Avatar;

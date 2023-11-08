import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import { UserSVG } from '@/svg';

import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({ withNameOrAddress, account }) => {
  const { currentAccount } = useWalletKit();
  const address = account?.address ?? (currentAccount?.address || '');

  return (
    <>
      <Box
        bg="primary"
        width="1.5rem"
        height="1.5rem"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <UserSVG
          maxWidth="1.5rem"
          maxHeight="1.5rem"
          width="80%"
          height="80%"
        />
      </Box>
      {withNameOrAddress && (
        <Box fontFamily="Proto !important">
          {address.slice(0, 6)}...{address.slice(-4)}
        </Box>
      )}
    </>
  );
};

export default Avatar;

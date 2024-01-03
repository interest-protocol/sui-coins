import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { WalletAccount } from '@wallet-standard/base';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from '@/components/account-info/avatar';
import { CopySVG } from '@/components/svg';

import ItemWrapper from '../../menu-settings/item-wrapper';

const UserInfo: FC = () => {
  const { currentAccount } = useWalletKit();

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied');
  };

  return (
    <>
      <Box>
        <Typography
          m="xl"
          size="large"
          variant="title"
          color="onSurfaceVariant"
        >
          Wallet
        </Typography>
      </Box>
      <Box
        borderBottom={['unset', 'unset', 'unset', '1px solid']}
        borderColor="outlineVariant"
      >
        <ItemWrapper isActive>
          <Box display="flex" alignItems="center" gap="l">
            <Avatar
              withNameOrAddress
              account={currentAccount as WalletAccount}
            />
          </Box>
          <Button
            isIcon
            variant="text"
            p="0 !important"
            color="onSurface"
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(currentAccount?.address || '');
            }}
          >
            <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Button>
        </ItemWrapper>
      </Box>
    </>
  );
};

export default UserInfo;

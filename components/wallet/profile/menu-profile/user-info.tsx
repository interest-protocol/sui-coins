import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from '@/components/account-info/avatar';
import { CopySVG } from '@/components/svg';

import ItemWrapper from '../../../menu-mobile/menu-settings/item-wrapper';

const UserInfo: FC = () => {
  const currentAccount = useCurrentAccount();

  const account = currentAccount?.address || '';

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied to the clipboard');
  };

  return (
    <>
      <Box p="l">
        <Typography size="small" variant="title">
          Wallet
        </Typography>
      </Box>
      <Box
        borderBottom={['unset', 'unset', 'unset', '1px solid']}
        borderColor="outlineVariant"
      >
        <ItemWrapper>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap="l">
              <Avatar withNameOrAddress />
            </Box>
            <Button
              isIcon
              p="0 !important"
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(account || '');
              }}
            >
              <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            </Button>
          </Box>
        </ItemWrapper>
      </Box>
    </>
  );
};

export default UserInfo;

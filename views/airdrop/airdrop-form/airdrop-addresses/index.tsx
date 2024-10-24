import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IAirdropForm } from '../../airdrop.types';
import AirdropAddressesListMethod from './airdrop-address-list-method';
import AirdropNftMethod from './airdrop-nft-method';
// import AirdropSuiPlayHoldersMethod from './airdrop-sui-play-holders';
import AirdropUploadCSV from './airdrop-upload-csv';

const AirdropAddresses: FC = () => {
  const { control } = useFormContext<IAirdropForm>();

  const method = useWatch({ control, name: 'method' });

  if (!method) return null;

  return (
    <Box
      p="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      bg="lowestContainer"
      flexDirection="column"
    >
      {method === 'csv' && <AirdropUploadCSV />}
      {method === 'nft' && <AirdropNftMethod />}
      {/* {method === 'suiPlay' && <AirdropSuiPlayHoldersMethod />} */}
      {method === 'addressList' && <AirdropAddressesListMethod />}
    </Box>
  );
};

export default AirdropAddresses;

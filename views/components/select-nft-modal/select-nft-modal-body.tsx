import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NFT } from '@/constants/nft';

import ModalTokenBody from './modal-nft-body';
import NotFound from './not-found';
import {
  SearchNFTForm,
  SelectNFTModalBodyProps,
} from './select-nft-modal.types';

const SelectTokenModalBody: FC<SelectNFTModalBodyProps> = ({
  handleSelectNFT,
}) => {
  const { control } = useFormContext<SearchNFTForm>();
  const search = useWatch({ control, name: 'search' });

  const nfts = NFT.filter(({ name }) => !search || name.includes(search));

  return (
    <>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        {!nfts.length ? (
          <NotFound />
        ) : (
          <ModalTokenBody handleSelectNFT={handleSelectNFT} nftList={nfts} />
        )}
      </Box>
    </>
  );
};

export default SelectTokenModalBody;

import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NFT } from '@/constants/nft';
import { useNFTMetadata } from '@/hooks/use-nft-metadata';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-nft-body';
import NotFound from './not-found';
import {
  SearchNFTForm,
  SelectNFTModalBodyProps,
} from './select-nft-modal.types';

const SelectTokenModalBody: FC<SelectNFTModalBodyProps> = ({
  handleSelectNFT,
}) => {
  const { nfts, loading, error } = useNFTMetadata();
  const { control } = useFormContext<SearchNFTForm>();
  const search = useWatch({ control, name: 'search' });

  const filteredNfts =
    nfts?.filter(
      ({ name, id }) => NFT.includes(id) && (!search || name.toLowercase().startsWith(search.toLowercase()))
    ) ?? [];

  return (
    <>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        {loading ? (
          <FetchingToken />
        ) : !error && !nfts.length ? (
          <NotFound />
        ) : (
          <ModalTokenBody
            handleSelectNFT={handleSelectNFT}
            nftList={filteredNfts}
          />
        )}
      </Box>
    </>
  );
};

export default SelectTokenModalBody;

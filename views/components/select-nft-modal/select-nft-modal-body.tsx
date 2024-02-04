import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import useNFTCollections from '@/hooks/use-nft-collections';

import FetchingToken from './fetching-nft';
import ModalTokenBody from './modal-nft-body';
import NotFound from './not-found';
import { SelectNFTModalBodyProps } from './select-nft-modal.types';

const SelectTokenModalBody: FC<SelectNFTModalBodyProps> = ({
  handleSelectNFT,
}) => {
  const { data, isLoading, error } = useNFTCollections();

  return (
    <>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        {isLoading ? (
          <FetchingToken />
        ) : !data || error ? (
          <NotFound />
        ) : (
          <>
            <ModalTokenBody
              nftList={data ?? []}
              handleSelectNFT={handleSelectNFT}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default SelectTokenModalBody;

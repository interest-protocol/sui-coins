import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';

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
  const { nfts, isFetchingCoinBalances, error } = useWeb3();
  const { control } = useFormContext<SearchNFTForm>();
  const search = useWatch({ control, name: 'search' });

  const filteredNfts =
    nfts?.filter(({ name }) => !search || name.includes(search)) ?? [];

  return (
    <>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        {isFetchingCoinBalances ? (
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

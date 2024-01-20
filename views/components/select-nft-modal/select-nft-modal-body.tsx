import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';

import FetchingToken from './fetching-nft';
import ModalTokenBody from './modal-nft-body';
import NotFound from './not-found';
import { SelectNFTModalBodyProps } from './select-nft-modal.types';

const SelectTokenModalBody: FC<SelectNFTModalBodyProps> = ({
  loading,
  handleSelectNFT,
}) => {
  const { network } = useNetwork();
  const { coins, coinsMap } = useWeb3();
  const favoriteTokens = useReadLocalStorage<ReadonlyArray<string>>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-${network}-favorite-nfts`
  );

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
        ) : !(coins.length || favoriteTokens?.length) ? (
          <NotFound />
        ) : (
          <>
            <ModalTokenBody
              tokens={coins ?? []}
              handleSelectNFT={handleSelectNFT}
            />
            <ModalTokenBody
              handleSelectNFT={handleSelectNFT}
              tokens={favoriteTokens?.map((token) => coinsMap[token]) ?? []}
            />
          </>
        )}
        {/**Condition needs improve */}
      </Box>
    </>
  );
};

export default SelectTokenModalBody;

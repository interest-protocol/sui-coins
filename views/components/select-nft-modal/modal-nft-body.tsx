import { FC } from 'react';
import { v4 } from 'uuid';

import NFTModalItem from './nft-modal-item';
import { ModalNFTBodyProps } from './select-nft-modal.types';

const ModalNFTBody: FC<ModalNFTBodyProps> = ({ nftList, handleSelectNFT }) => (
  <>
    {nftList?.map((nft) => (
      <NFTModalItem
        selected={false}
        key={v4()}
        onClick={() => handleSelectNFT(nft)}
        {...nft}
      />
    ))}
  </>
);

export default ModalNFTBody;

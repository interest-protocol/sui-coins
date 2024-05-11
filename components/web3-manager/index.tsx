import { FC } from 'react';

import AllObjectsManager from './all-objects-manager';
import CoinsManager from './coins-manager';
import NFTMetadataManager from './nft-metadata-manger';
import { Web3ManagerProps } from './web3-manager.types';

const Web3Manager: FC<Web3ManagerProps> = ({ features = ['coins'] }) => (
  <>
    {features.includes('coins') && <CoinsManager />}
    {features.includes('nfts') && <NFTMetadataManager />}
    {features.includes('objects') && <AllObjectsManager />}
  </>
);

export default Web3Manager;

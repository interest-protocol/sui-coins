import { useContext } from 'react';

import { Web3ManagerContext } from '@/context/web3-manager';

export const useWeb3 = () => useContext(Web3ManagerContext);

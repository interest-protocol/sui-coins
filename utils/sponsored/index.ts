import { rpcClient } from 'typed-rpc';

import { ZK_SEND_GAS_BUDGET } from '@/constants/zksend';

interface SponsoredTransaction {
  txBytes: string;
  txDigest: string;
  signature: string;
  expireAtTime: number;
  expireAfterEpoch: number;
}
type SponsoredTransactionStatus = 'IN_FLIGHT' | 'COMPLETE' | 'INVALID';

interface SponsorRpc {
  gas_sponsorTransactionBlock(
    txBytes: string,
    sender: string,
    gasBudget: number
  ): SponsoredTransaction;
  gas_getSponsoredTransactionBlockStatus(
    txDigest: string
  ): SponsoredTransactionStatus;
}

const TESTNET_SPONSOR_RPC_URL = `https://api.shinami.com/gas/v1/${process.env.TESTNET_NODE_AND_GAS_KEY}`;
const MAINNET_SPONSOR_RPC_URL = `https://api.shinami.com/gas/v1/${process.env.MAINNET_NODE_AND_GAS_KEY}`;

const testnetSponsor = rpcClient<SponsorRpc>(TESTNET_SPONSOR_RPC_URL);
const mainnetSponsor = rpcClient<SponsorRpc>(MAINNET_SPONSOR_RPC_URL);

interface SponsorTxArgs {
  txbBytes: string;
  sender: string;
  isMainnet: boolean;
}

export const sponsorTx = async ({
  txbBytes,
  sender,
  isMainnet,
}: SponsorTxArgs) => {
  const sponsor = isMainnet ? mainnetSponsor : testnetSponsor;

  const sponsoredResponse = await sponsor.gas_sponsorTransactionBlock(
    txbBytes,
    sender,
    ZK_SEND_GAS_BUDGET
  );

  await sponsor.gas_getSponsoredTransactionBlockStatus(
    sponsoredResponse.txDigest
  );

  return sponsoredResponse;
};

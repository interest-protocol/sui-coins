import { GasStationClient } from '@shinami/clients';

import { ZK_SEND_GAS_BUDGET } from '@/constants/zksend';

const testnetGasStationClient = new GasStationClient(
  process.env.TESTNET_SPONSOR_RPC_URL!
);
const mainnetGasStationClient = new GasStationClient(
  process.env.MAINNET_SPONSOR_RPC_URL!
);

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
  const rpc = isMainnet ? mainnetGasStationClient : testnetGasStationClient;

  const sponsoredResponse = await rpc.sponsorTransactionBlock(
    txbBytes,
    sender,
    ZK_SEND_GAS_BUDGET
  );

  await rpc.getSponsoredTransactionBlockStatus(sponsoredResponse.txDigest);

  return sponsoredResponse;
};

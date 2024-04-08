import { ZkBagContractOptions } from '@mysten/zksend';

export const testnetZKBagContract: ZkBagContractOptions = {
  packageId:
    '0x7175344e5bb8a85560018f4c54eef10c97a4d0f3a72cb1d938d7ef0f52d19254',
  bagStoreId:
    '0xecaa42a3952c4c46856769b5d9246f1eb5d9ba91316849e6d9ef9f350486ca16',
  bagStoreTableId:
    '0xb0cbc8d39962f36fa65e9d1d1393be10956fb1f46b52b3c952c1df0194fcf5b4',
};

export const ZK_SEND_GAS_BUDGET = 2_500_000;

export const SPONSOR_WALLET =
  '0x2bbb58d6300439abfcc9ad13dd12b04e6ea6fce1c3604de7507a0a39d8573b19';

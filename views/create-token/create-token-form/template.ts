import { bcs } from '@mysten/sui.js/bcs';
import { fromHEX, normalizeSuiAddress, toHEX } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';

import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import * as template from './move-bytecode-template';

const getCoinTemplateByteCode = () =>
  'a11ceb0b060000000a01000c020c1e032a2d04570a05616307c401e70108ab0360068b046c0af704050cfc04360007010d02060212021302140000020001020701000002010c01000102030c0100010404020005050700000a000100011105060100020808090102020b0c010100030e0501010c030f0e01010c04100a0b00050c030400010402070307050d040f02080007080400020b020108000b03010800010a02010805010900010b01010900010800070900020a020a020a020b01010805070804020b030109000b0201090001060804010504070b030109000305070804010b0301080002090005010b020108000d434f494e5f54454d504c4154450c436f696e4d65746164617461064f7074696f6e0b5472656173757279436170095478436f6e746578740355726c04636f696e0d636f696e5f74656d706c6174650f6372656174655f63757272656e63790b64756d6d795f6669656c6404696e6974116d696e745f616e645f7472616e73666572156e65775f756e736166655f66726f6d5f6279746573066f7074696f6e137075626c69635f73686172655f6f626a6563740f7075626c69635f7472616e736665720673656e64657204736f6d65087472616e736665720a74785f636f6e746578740375726c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020201060a020504544d504c0a020e0d54656d706c61746520436f696e0a021a1954656d706c61746520436f696e204465736372697074696f6e0a02040375726c030800000000000000000520000000000000000000000000000000000000000000000000000000000000000000020109010000000002190b0007000701070207030704110738000a0138010c020c030d0307050a012e11060b0138020b03070638030b0238040200';

const Address = bcs.bytes(32).transform({
  // To change the input type, you need to provide a type definition for the input
  input: (val: string) => fromHEX(val),
  output: (val) => toHEX(val),
});

const updateDecimals = (modifiedByteCode: Uint8Array, decimals: number = 9) =>
  template.update_constants(
    modifiedByteCode,
    bcs.u8().serialize(decimals).toBytes(),
    bcs.u8().serialize(6).toBytes(),
    'U8'
  );

const updateSymbol = (modifiedByteCode: Uint8Array, symbol: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(symbol.toUpperCase()).toBytes(),
    bcs.string().serialize('TMPL').toBytes(),
    'Vector(U8)'
  );

const updateName = (modifiedByteCode: Uint8Array, name: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(name).toBytes(),
    bcs.string().serialize('Template Coin').toBytes(),
    'Vector(U8)'
  );

const updateDescription = (modifiedByteCode: Uint8Array, description: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(description).toBytes(),
    bcs.string().serialize('Template Coin Description').toBytes(),
    'Vector(U8)'
  );

const updateUrl = (modifiedByteCode: Uint8Array, url: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(url).toBytes(),
    bcs.string().serialize('url').toBytes(),
    'Vector(U8)'
  );

const updateMintAmount = (modifiedByteCode: Uint8Array, supply: BigNumber) =>
  template.update_constants(
    modifiedByteCode,
    bcs.u64().serialize(supply.toString()).toBytes(),
    bcs.u64().serialize(0).toBytes(),
    'U64'
  );

const updateTreasuryCapRecipient = (
  modifiedByteCode: Uint8Array,
  recipient: string
) =>
  template.update_constants(
    modifiedByteCode,
    Address.serialize(recipient).toBytes(),
    Address.serialize(normalizeSuiAddress('0x0')).toBytes(),
    'Address'
  );

export const getBytecode = (info: ICreateTokenForm & { recipient: string }) => {
  const templateByteCode = fromHEX(getCoinTemplateByteCode());

  const modifiedByteCode = template.update_identifiers(templateByteCode, {
    COIN_TEMPLATE: info.symbol.toUpperCase(),
    coin_template: info.symbol.toLowerCase(),
  });

  let updated = updateDecimals(modifiedByteCode, info.decimals);
  updated = updateSymbol(updated, info.symbol);
  updated = updateName(updated, info.name);
  updated = updateDescription(updated, info.description ?? '');
  updated = updateUrl(updated, info.imageUrl ?? '');

  const supply = BigNumber(info.totalSupply).times(
    BigNumber(10).pow(info.decimals || 9)
  );

  updated = updateMintAmount(updated, supply);
  updated = updateTreasuryCapRecipient(
    updated,
    info.fixedSupply ? normalizeSuiAddress('0x0') : info.recipient
  );

  return updated;
};

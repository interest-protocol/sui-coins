import { bcs } from '@mysten/sui/bcs';
import { fromHEX } from '@mysten/sui/utils';

import { GetByteCodeArgs } from '@/views/pool-create/pool-create.types';

import * as template from './move-bytecode-template';

export const getLpCoinTemplateByteCode = () =>
  'a11ceb0b060000000a01000c020c1e032a2704510805594c07a501c90108ee026006ce032b0af903050cfe0328000a010c02060211021202130001020001020701000002000c01000102030c01000104040200050507000009000100011005060100020708090102030d0501010c030e0d01010c040f0a0b00050b03040001040207040c030202080007080400010b02010800010a02010805010900010b01010900010800070900020a020a020a020b01010805070804020b030109000b02010900010608040105010b03010800020900050c436f696e4d65746164617461074c505f434f494e064f7074696f6e0b5472656173757279436170095478436f6e746578740355726c04636f696e0f6372656174655f63757272656e63790b64756d6d795f6669656c6404696e6974076c705f636f696e156e65775f756e736166655f66726f6d5f6279746573066f7074696f6e137075626c69635f73686172655f6f626a6563740f7075626c69635f7472616e736665720673656e64657204736f6d65087472616e736665720a74785f636f6e746578740375726c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020201090a02070653594d424f4c0a0205044e414d450a020c0b4445534352495054494f4e0a02040375726c00020108010000000002120b0007000701070207030704110638000a0138010c020b012e110538020b0238030200';

const updateDecimals = (modifiedByteCode: Uint8Array, decimals: number = 9) =>
  template.update_constants(
    modifiedByteCode,
    bcs.u8().serialize(decimals).toBytes(),
    bcs.u8().serialize(9).toBytes(),
    'U8'
  );

const updateSymbol = (modifiedByteCode: Uint8Array, symbol: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(symbol.trim()).toBytes(),
    bcs.string().serialize('SYMBOL').toBytes(),
    'Vector(U8)'
  );

const updateName = (modifiedByteCode: Uint8Array, name: string) => {
  return template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(name.trim()).toBytes(),
    bcs.string().serialize('NAME').toBytes(),
    'Vector(U8)'
  );
};

const updateDescription = (modifiedByteCode: Uint8Array, description: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(description.trim()).toBytes(),
    bcs.string().serialize('DESCRIPTION').toBytes(),
    'Vector(U8)'
  );

const updateUrl = (modifiedByteCode: Uint8Array, url: string) =>
  template.update_constants(
    modifiedByteCode,
    bcs.string().serialize(url).toBytes(),
    bcs.string().serialize('url').toBytes(),
    'Vector(U8)'
  );

export const getLpCoinBytecode = (info: GetByteCodeArgs) => {
  const templateByteCode = fromHEX(getLpCoinTemplateByteCode());

  const modifiedByteCode = template.update_identifiers(templateByteCode, {
    LP_COIN: info.symbol.toUpperCase().replaceAll('-', '_'),
    lp_coin: info.symbol.toLowerCase().replaceAll('-', '_'),
  });

  let updated = updateDecimals(modifiedByteCode, 9);

  updated = updateSymbol(updated, info.symbol);
  updated = updateName(updated, info.name);

  updated = updateDescription(updated, info.description ?? '');
  updated = updateUrl(updated, info.imageUrl ?? '');

  return updated;
};

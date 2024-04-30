import { Button } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { devInspectAndGetReturnValues } from '@polymedia/suits';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { AMM_CURVES, OBJECTS, PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useMovementClient, useWeb3 } from '@/hooks';
import { createObjectsParameter, getSafeValue } from '@/utils';

import { CreatePoolForm } from './pool-create.types';

const PoolCreateButton: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const { step, type, isStable, tokens } = useWatch({ control });
  const { coinsMap, account } = useWeb3();

  const movementClient = useMovementClient();
  const network = useNetwork();
  const objects = OBJECTS[network];
  const packages = PACKAGES[network];
  const ammCurves = AMM_CURVES[network];

  const areCoinsOrdered = async () => {
    invariant(tokens && tokens.length, 'You must select at least 2 coins');

    const txb = new TransactionBlock();
    const [coinX, coinY] = tokens;

    invariant(coinX.type && coinY.type, 'Coin types not found');

    txb.moveCall({
      typeArguments: [coinX.type, coinY.type],
      target: `${packages.DEX}::utils::are_coins_ordered`,
    });

    const result = await devInspectAndGetReturnValues(movementClient, txb);
    return result[0][0] as boolean;
  };

  const doesPoolExist = async () => {
    try {
      invariant(tokens && tokens.length, 'You must select at least 2 coins');
      const [coinX, coinY] = tokens;
      invariant(coinX.type && coinY.type, 'Coin types not found');

      const isOrdered = await areCoinsOrdered();

      const txb2 = new TransactionBlock();

      const curve = isStable ? ammCurves.STABLE : ammCurves.VOLATILE;

      const typeArguments = isOrdered
        ? [curve, coinX.type, coinY.type]
        : [curve, coinY.type, coinX.type];

      txb2.moveCall({
        target: `${packages.DEX}::interest_protocol_amm::exists_`,
        typeArguments,
        arguments: [txb2.object(objects.REGISTRY)],
      });

      const result2 = await devInspectAndGetReturnValues(movementClient, txb2);

      return result2[0][0] as boolean;
    } catch {}
  };

  const createPool = async () => {
    invariant(account, 'You must log into your wallet');
    invariant(tokens && tokens.length, 'You must select at least 2 coins');
    const [coinX, coinY] = tokens;
    invariant(coinX.type && coinY.type, 'Coin types not found');
    invariant(coinX.value && coinY.value, 'Deposit more than zero coins');

    const isOrdered = await areCoinsOrdered();

    const txb = new TransactionBlock();

    const walletCoinX = coinsMap[coinX.type];
    const walletCoinY = coinsMap[coinY.type];

    const safeValueX = getSafeValue({
      coinValue: coinX.value,
      coinType: coinX.type,
      decimals: coinX.decimals || 0,
      balance: walletCoinX.balance,
    });

    const safeValueY = getSafeValue({
      coinValue: coinY.value,
      coinType: coinY.type,
      decimals: coinY.decimals || 0,
      balance: walletCoinY.balance,
    });

    const coinXInList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: coinX.type,
      amount: safeValueX.toString(),
    });

    const coinYInList = createObjectsParameter({
      coinsMap,
      txb: txb,
      type: coinY.type,
      amount: safeValueY.toString(),
    });

    const coinXIn = txb.moveCall({
      target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
      typeArguments: [coinX.type],
      arguments: [
        txb.makeMoveVec({ objects: coinXInList }),
        txb.pure(safeValueX.toString()),
      ],
    });

    // public new_pool<Ty0, Ty1, Ty2>(Arg0: &mut Registry, Arg1: Coin<Ty0>, Arg2: Coin<Ty1>, Arg3: TreasuryCap<Ty2>, Arg4: &CoinMetadata<Ty0>, Arg5: &CoinMetadata<Ty1>, Arg6: &mut CoinMetadata<Ty2>, Arg7: bool, Arg8: &mut TxContext): Coin<Ty2> {

    const coinYIn = txb.moveCall({
      target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
      typeArguments: [coinY.type],
      arguments: [
        txb.makeMoveVec({ objects: coinYInList }),
        txb.pure(safeValueY.toString()),
      ],
    });

    // TODO
    // ID
    const treasuryCap = '';
    const lpCoinType = '';
    // the ID
    const lpCoinMetadata = '';

    const typeArguments = isOrdered
      ? [coinX.type, coinY.type, lpCoinType]
      : [coinY.type, coinX.type, lpCoinType];

    const coin0 = isOrdered ? coinXIn : coinYIn;
    const coin1 = isOrdered ? coinYIn : coinXIn;

    const [coinXMeta, coinYMeta] = await Promise.all([
      movementClient.getCoinMetadata({ coinType: coinX.type }),
      movementClient.getCoinMetadata({ coinType: coinY.type }),
    ]);

    const coin0Meta = isOrdered ? coinXMeta : coinYMeta;
    const coin1Meta = isOrdered ? coinYMeta : coinXMeta;

    invariant(coin0Meta && coin0Meta.id, 'CoinX does not have a metadata');
    invariant(coin1Meta && coin1Meta.id, 'CoinY does not have a metadata');

    const lpCoin = txb.moveCall({
      target: `${packages.DEX}::interest_protocol_amm::new_pool`,
      typeArguments,
      arguments: [
        txb.object(objects.REGISTRY),
        coin0,
        coin1,
        txb.object(treasuryCap),
        txb.object(coin0Meta.id),
        txb.object(coin1Meta.id),
        txb.object(lpCoinMetadata),
        txb.pure(!isStable),
      ],
    });

    txb.transferObjects([lpCoin], txb.pure.address(account));

    // TODO sign and whatever
    // Read the events and get the poolId
    // Call API
  };

  const isDisabled = [
    type === undefined,
    isStable === undefined,
    !tokens?.every(
      ({ type, value, symbol, decimals }) =>
        type && symbol && Number(value) && String(decimals)
    ),
  ];
  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        { type: '', symbol: '', decimals: 0, value: '' },
        { type: '', symbol: '', decimals: 0, value: '' },
      ]),
    () => setValue('dex', ''),
  ];

  return (
    <Button
      mx="auto"
      variant="filled"
      disabled={isDisabled[step!]}
      onClick={async () => {
        if (step === 2) {
          const exists = await doesPoolExist();
          // TODO Disable button and say pool already created
          // TODO add loader
          console.log(exists);
        }

        handleClick[step!]?.();
        setValue('step', step! + 1);
      }}
    >
      Next
    </Button>
  );
};

export default PoolCreateButton;

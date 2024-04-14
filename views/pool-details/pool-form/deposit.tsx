import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSignTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog, useMovementClient, useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import {
  createObjectsParameter,
  getAmountMinusSlippage,
  showTXSuccessToast,
  throwTXIfNotSuccessful,
} from '@/utils';
import {
  getAmmLpCoinAmount,
  getSafeValue,
} from '@/views/pool-details/pool-form/pool-form.utils';
import { PoolForm } from '@/views/pools/pools.types';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from './component/field';
import { PoolFormProps } from './component/field/field.types';
import PoolReceiveSection from './component/receive-section';
import DepositManager from './deposit-manager';
import PoolPreview from './preview';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { setModal } = useModal();
  const { getValues } = useFormContext<PoolForm>();
  const signTransactionBlock = useSignTransactionBlock();
  const { coinsMap } = useWeb3();
  const tokenList = getValues('tokenList');
  const network = useNetwork();
  const account = useCurrentAccount();
  const client = useMovementClient();

  const { dialog, handleClose } = useDialog();

  const handleDeposit = async () => {
    try {
      const { tokenList, pool, lpCoin, settings } = getValues();

      if (!tokenList.length || !account) return;

      const coin0 = tokenList[0];
      const coin1 = tokenList[1];

      if (!+coin0.value || !+coin1.value) return;

      const walletCoin0 = coinsMap[coin0.type];
      const walletCoin1 = coinsMap[coin1.type];

      if (!walletCoin0 || !walletCoin1) return;

      const txb = new TransactionBlock();

      const amount0 = getSafeValue(coin0, walletCoin0.balance);

      const amount1 = getSafeValue(coin1, walletCoin1.balance);

      const coin0InList = createObjectsParameter({
        coinsMap,
        txb: txb,
        type: coin0.type,
        amount: amount0.toString(),
      });

      const coin1InList = createObjectsParameter({
        coinsMap,
        txb: txb,
        type: coin1.type,
        amount: amount1.toString(),
      });

      const coin0In = txb.moveCall({
        target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
        typeArguments: [coin0.type],
        arguments: [
          txb.makeMoveVec({
            objects: coin0InList,
          }),
          txb.pure(amount0),
        ],
      });

      const coin1In = txb.moveCall({
        target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
        typeArguments: [coin1.type],
        arguments: [
          txb.makeMoveVec({
            objects: coin1InList,
          }),
          txb.pure(amount1),
        ],
      });

      const lpAmount = getAmmLpCoinAmount(
        FixedPointMath.toBigNumber(coin0.value, coin0.decimals),
        FixedPointMath.toBigNumber(coin1.value, coin1.decimals),
        pool.balanceX,
        pool.balanceY,
        pool.lpCoinSupply
      );

      const minimumAmount = getAmountMinusSlippage(lpAmount, settings.slippage);

      const [lpCoinOut, coinXOut, coinYOut] = txb.moveCall({
        target: `${PACKAGES[network].DEX}::interest_protocol_amm::add_liquidity`,
        typeArguments: [coin0.type, coin1.type, lpCoin.type],
        arguments: [
          txb.object(pool.poolId),
          coin0In,
          coin1In,
          txb.pure(minimumAmount),
        ],
      });

      txb.transferObjects(
        [lpCoinOut, coinXOut, coinYOut],
        txb.pure(account.address)
      );

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: account,
        });

      const tx = await client.executeTransactionBlock({
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
        transactionBlock: transactionBlockBytes,
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally');
    }
  };

  const deposit = () => {
    dialog.promise(handleDeposit(), {
      loading: {
        title: 'Depositing...',
        message: 'We are Depositing, and you will let you know when it is done',
      },
      success: {
        title: 'Deposit Successfully',
        message:
          'Your deposit was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: handleClose,
        },
      },
      error: {
        title: 'Deposit Failure',
        message:
          'Your deposiing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  const addDeposit = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={deposit} isDeposit />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {tokenList.map((_: any, index: number) => (
          <PoolField key={v4()} index={index} poolOptionView={poolOptionView} />
        ))}
      </Box>
      <PoolReceiveSection />
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="lowestContainer" borderRadius="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <Button
        py="s"
        mt="xl"
        mx="auto"
        variant="filled"
        width="max-content"
        onClick={addDeposit}
      >
        Deposit
      </Button>
      <DepositManager />
    </>
  );
};

export default PoolDeposit;

import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { isValidSuiAddress } from '@mysten/sui/utils';
import { toPairs } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import { Network } from '@/constants';
import { useSuiNs } from '../../../../../resui/suins';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { DotErrorSVG, PlusSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { getAmountsMapFromObjects } from '@/views/components/send-asset-details/send-asset-details.utils';

import { ISendTransferForm } from '../send-transfer.types';
import useSendAssets from './send-transfer-button.hooks';
import {
  AmountListProps,
  FormSendButtonProps,
} from './send-transfer-button.types';

const SendTransferButton: FC<FormSendButtonProps> = ({ openModal }) => {
  const { coinsMap } = useWeb3();
  const { suinsClient } = useSuiNs();
  const sendAssets = useSendAssets();
  const { network } = useSuiClientContext();
  const { control, setError } = useFormContext<ISendTransferForm>();
  const [amountList, setAmountList] = useState<AmountListProps[] | null>();

  const objects = useWatch({ control, name: 'objects' });
  const [address] = useDebounce(useWatch({ control, name: 'address' }), 800);

  const onSuccess = (tx: TimedSuiTransactionBlockResponse) =>
    showTXSuccessToast(tx, network as Network, 'Assets sent successfully');

  useEffect(() => {
    setAmountList(
      toPairs(getAmountsMapFromObjects(objects))
        .map(([type, amount]) => ({
          symbol: coinsMap[type].symbol,
          isGreater: coinsMap[type].balance.isLessThan(amount),
        }))
        .filter((item) => item.isGreater)
    );
  }, [objects]);

  const handleSendAssets = async () => {
    if (
      !address ||
      !objects ||
      !objects.length ||
      !objects.every(({ value }) => Number(value))
    )
      return;

    const recipient = address.includes('@')
      ? await suinsClient
          .getNameRecord(
            (address.startsWith('@')
              ? address.slice(1)
              : address.replace('@', '.')) + '.sui'
          )
          .then(({ targetAddress }) => targetAddress)
          .catch(() =>
            setError('address', { message: 'Sui name does not exist' })
          )
      : isValidSuiAddress(address)
        ? address
        : '';

    if (!recipient) return setError('address', { message: 'Invalid address' });

    const toasterId = toast.loading('Sending assets...');

    try {
      await sendAssets(objects, recipient, onSuccess);
    } catch (e) {
      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      toast.dismiss(toasterId);
    }
  };

  return (
    <>
      {amountList?.length ? (
        <Box
          p="s"
          gap="s"
          display="flex"
          borderRadius="xs"
          border="1px solid"
          bg="errorContainer"
          color="onErrorContainer"
          borderColor="onErrorContainer"
        >
          {amountList?.map((item) => (
            <>
              <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              <Typography variant="label" size="medium">
                {`You don't have enough ${item.symbol} for this operation`}
              </Typography>
            </>
          ))}
        </Box>
      ) : null}
      <Box display="flex" justifyContent="center" gap="xs">
        <Button
          variant="outline"
          onClick={openModal}
          borderColor="outlineVariant"
          SuffixIcon={
            <PlusSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
          }
        >
          Add more
        </Button>
        <Button
          variant="filled"
          onClick={handleSendAssets}
          disabled={
            !address ||
            !objects ||
            !objects.length ||
            !objects.every(({ value }) => Number(value)) ||
            !amountList ||
            Boolean(amountList.length)
          }
        >
          Send Asset{objects.length > 1 ? 's' : ''}
        </Button>
      </Box>
    </>
  );
};

export default SendTransferButton;

import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { toPairs } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Network, Routes, RoutesEnum } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { DotErrorSVG, PlusSVG } from '@/svg';
import { showTXSuccessToast } from '@/utils';
import { getAmountsMapFromObjects } from '@/views/components/send-asset-details/send-asset-details.utils';

import { ISendSimpleForm } from '../send-simple.types';
import useCreateLink from './send-button.hooks';
import { AmountListProps, FormSendButtonProps } from './send-button.types';

const FormSendButton: FC<FormSendButtonProps> = ({ openModal }) => {
  const { push } = useRouter();
  const { coinsMap } = useWeb3();
  const createLink = useCreateLink();
  const { network } = useSuiClientContext();
  const { control } = useFormContext<ISendSimpleForm>();
  const objects = useWatch({ control, name: 'objects' });
  const [amountList, setAmountList] = useState<AmountListProps[] | null>();

  const onSuccess = (tx: TimedSuiTransactionBlockResponse, url: string) => {
    showTXSuccessToast(tx, network as Network, 'Link created successfully');

    push(`${Routes[RoutesEnum.SendLink]}#${url.split('#')[1]}`);
  };

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

  const handleCreateLink = async () => {
    if (
      !objects ||
      !objects.length ||
      !objects.every(({ value }) => Number(value))
    )
      return;

    const toasterId = toast.loading('Creating link...');

    try {
      await createLink(objects, onSuccess);
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
          onClick={handleCreateLink}
          disabled={
            !objects ||
            !objects.length ||
            !objects.every(({ value }) => Number(value)) ||
            !amountList ||
            Boolean(amountList.length)
          }
        >
          Create Link
        </Button>
      </Box>
    </>
  );
};

export default FormSendButton;

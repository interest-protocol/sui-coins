import { Box, Button } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/src/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { ObjectData } from '@/hooks/use-get-all-objects/use-get-all-objects.types';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast } from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { ZkSendForm } from '../send-form.types';
import useCreateLink from './send-button.hooks';

const SendButton: FC = () => {
  const { push } = useRouter();
  const network = useNetwork();
  const createLink = useCreateLink();
  const { control } = useFormContext<ZkSendForm>();
  const object = useWatch({ control, name: 'object' });

  const onSuccess = (tx: SuiTransactionBlockResponse, id: string) => {
    showTXSuccessToast(tx, network);

    push(`${Routes[RoutesEnum.SendLink]}/${id}`);
  };

  const handleCreateLink = async () => {
    if (!object) return;

    if (isCoinObject(object as ObjectData))
      return createLink(
        {
          type: object.display!.type,
          amount: BigInt(
            FixedPointMath.toBigNumber(
              object.value!,
              Number(object.display!.decimals!)
            )
              .decimalPlaces(0)
              .toString()
          ),
        },
        onSuccess
      );

    return createLink({ id: object.objectId }, onSuccess);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="filled"
        onClick={handleCreateLink}
        disabled={!object || !Number(object.value)}
      >
        Create Link
      </Button>
    </Box>
  );
};

export default SendButton;

import { Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { useSuiClient } from '@mysten/dapp-kit';
import { type FC, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';

import { CreatePoolForm, CreatePoolStep, Token } from './pool-create.types';
import { doesPoolExists } from './pool-create.utils';

const PoolNextButton: FC = () => {
  const network = useNetwork();
  const movementClient = useSuiClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, setValue, getValues } = useFormContext<CreatePoolForm>();
  const { step, type, isStable, tokens } = useWatch({ control });

  const error = getValues('error');

  const checkIfPoolExists = async () => {
    try {
      setLoading(true);

      return await doesPoolExists(
        tokens as ReadonlyArray<Token>,
        isStable,
        movementClient,
        network
      );
    } catch (e) {
      setValue('error', (e instanceof Error ? e.message : e) as string);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = useMemo(() => {
    if (error || loading) return true;
    if (step === CreatePoolStep.PoolType) return type === undefined;
    if (step === CreatePoolStep.PoolAlgorithm) return isStable === undefined;
    if (step === CreatePoolStep.PoolCoins)
      return !tokens?.every(
        ({ type, value, symbol, decimals }) =>
          type && symbol && Number(value) && String(decimals)
      );

    return false;
  }, [step, type, isStable, tokens, loading]);

  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        {
          type: '' as `0x${string}`,
          symbol: '',
          decimals: 0,
          value: '',
          usdPrice: null,
        },
        {
          type: '' as `0x${string}`,
          symbol: '',
          decimals: 0,
          value: '',
          usdPrice: null,
        },
      ]),
  ];

  return (
    <>
      <Button
        mx="auto"
        variant="filled"
        disabled={isDisabled || !!error}
        PrefixIcon={
          loading ? <ProgressIndicator variant="loading" size={16} /> : null
        }
        onClick={async () => {
          if (step === CreatePoolStep.PoolCoins) {
            const exists = await checkIfPoolExists();

            if (exists) {
              setValue('error', 'This pool already exists');
              return;
            }
          }

          handleClick[step!]?.();
          setValue('step', step! + 1);
        }}
      >
        Next
      </Button>
    </>
  );
};

export default PoolNextButton;

import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { useSuiClient } from '@mysten/dapp-kit';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { DotErrorSVG } from '@/svg';

import { CreatePoolForm, CreatePoolStep, Token } from './pool-create.types';
import { doesPoolExists } from './pool-create.utils';

const PoolNextButton: FC = () => {
  const network = useNetwork();
  const movementClient = useSuiClient();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const { step, type, isStable, tokens } = useWatch({ control });

  useEffect(() => {
    if (error) setError(undefined);
  }, [tokens]);

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
      setError((e instanceof Error ? e.message : e) as string);
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
        { type: '', symbol: '', decimals: 0, value: '' },
        { type: '', symbol: '', decimals: 0, value: '' },
      ]),
    // () => setValue('dex', ''),
  ];

  return (
    <>
      {error && (
        <Box
          p="2xl"
          mb="xl"
          mx="auto"
          gap="2rem"
          bg="container"
          maxWidth="33rem"
          borderRadius="xs"
        >
          <Box
            p="s"
            mx="xl"
            gap="s"
            display="flex"
            borderRadius="xs"
            border="1px solid"
            bg="errorContainer"
            color="onErrorContainer"
            borderColor="onErrorContainer"
          >
            <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            <Typography variant="label" size="medium">
              {error}
            </Typography>
          </Box>
        </Box>
      )}
      <Button
        mx="auto"
        variant="filled"
        disabled={isDisabled}
        PrefixIcon={
          loading ? <ProgressIndicator variant="loading" size={16} /> : null
        }
        onClick={async () => {
          if (step === CreatePoolStep.PoolCoins) {
            const exists = await checkIfPoolExists();

            if (exists) {
              setError('This pool already exists');
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

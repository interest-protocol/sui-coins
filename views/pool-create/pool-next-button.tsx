import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/svg';

import { CreatePoolForm, CreatePoolStep } from './pool-create.types';

const PoolNextButton: FC = () => {
  const [error, setError] = useState<string>();
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const { step, type, isStable, tokens } = useWatch({ control });

  useEffect(() => {
    if (error) setError(undefined);
  }, [tokens]);

  const isDisabled = useMemo(() => {
    if (step === CreatePoolStep.PoolType) return type === undefined;
    if (step === CreatePoolStep.PoolAlgorithm) return isStable === undefined;
    if (step === CreatePoolStep.PoolCoins)
      return !tokens?.every(
        ({ type, value, symbol, decimals }) =>
          type && symbol && Number(value) && String(decimals)
      );

    return false;
  }, [step, type, isStable, tokens]);

  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        { type: '' as `0x${string}`, symbol: '', decimals: 0, value: '' },
        { type: '' as `0x${string}`, symbol: '', decimals: 0, value: '' },
      ]),
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
        disabled={isDisabled || !!error}
        onClick={async () => {
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

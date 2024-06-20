import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useBlocklist } from '@/hooks/use-blocklist';
import { BurnSVG } from '@/svg';

import { useOnBurn } from './incinerator.hooks';
import { IncineratorForm } from './incinerator.types';

const IncineratorBurnScams: FC = () => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const { data, isLoading, error } = useBlocklist();

  const onBurn = useOnBurn();

  const objects = useWatch({ control, name: 'objects' });

  const disabled =
    isLoading || !!error || !objects.some(({ type }) => data?.includes(type));

  const onSelectScams = () => {
    if (disabled) return;
    if (!data) return;

    const selectObjects = objects.reduce(
      (acc, curr, index) => {
        if (
          !data.includes(curr.kind === 'Coin' ? curr.display!.type : curr.type)
        )
          return acc;

        setValue(`objects.${index}.active`, true);

        return [...acc, curr];
      },
      [] as IncineratorForm['objects']
    );

    if (!selectObjects.length) return;

    onBurn({ objects: selectObjects });
  };

  return (
    <Button
      variant="tonal"
      bg="errorContainer"
      borderRadius="full"
      alignItems="center"
      position="relative"
      whiteSpace="nowrap"
      disabled={disabled}
      onClick={onSelectScams}
      color="onErrorContainer"
      borderColor="outlineVariant"
      nHover={disabled ? undefined : { bg: 'error', color: 'surface' }}
      nActive={disabled ? undefined : { bg: 'error', color: 'surface' }}
    >
      <BurnSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
      Burn scams
    </Button>
  );
};

export default IncineratorBurnScams;

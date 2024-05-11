import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { RefreshSVG } from '@/svg';

import { IncineratorForm } from './incinerator.types';

const IncineratorRefresh: FC = () => {
  const { mutate } = useWeb3();
  const { setValue } = useFormContext<IncineratorForm>();

  const onRefresh = () => {
    mutate();
    setValue('reset', true);
    setValue('empty', true);
  };

  return (
    <Button
      isIcon
      mx="s"
      variant="text"
      width="1.5rem"
      height="1.5rem"
      bg="transparent"
      color="onSurface"
      border="1px solid"
      borderRadius="full"
      alignItems="center"
      position="relative"
      onClick={onRefresh}
      borderColor="outlineVariant"
      nHover={{ bg: 'lowContainer' }}
      nActive={{ bg: 'transparent', color: 'onSurface' }}
    >
      <RefreshSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
    </Button>
  );
};

export default IncineratorRefresh;

import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckRoundedSVG, TimesRoundedSVG } from '@/svg';

import {
  IncineratorForm,
  IncineratorTableColumnProps,
} from '../../../incinerator.types';

const IncineratorTableActions: FC<IncineratorTableColumnProps> = ({
  index,
  value,
}) => {
  const { setValue } = useFormContext<IncineratorForm>();

  const handleApprove = () => {
    setValue(`objects.${index}.value`, value);
    setValue(`objects.${index}.isEditing`, false);
  };

  const handleCancel = () => {
    setValue(`objects.${index}.isEditing`, false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap="xl">
      <Box onClick={handleApprove}>
        <CheckRoundedSVG maxHeight="1.75rem" maxWidth="1.75rem" width="100%" />
      </Box>
      <Box onClick={handleCancel}>
        <TimesRoundedSVG maxHeight="1.75rem" maxWidth="1.75rem" width="100%" />
      </Box>
    </Box>
  );
};

export default IncineratorTableActions;

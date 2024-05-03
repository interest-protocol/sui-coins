import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckmarkSVG, TimesSVG } from '@/svg';

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
    <Box
      display="flex"
      height="2.5rem"
      alignItems="center"
      justifyContent="flex-end"
      gap="xs"
    >
      <Button
        isIcon
        mx="xs"
        bg="success"
        variant="text"
        height="0.4rem"
        width="0.4rem"
        borderRadius="full"
        color="lowestContainer"
        onClick={handleApprove}
      >
        <CheckmarkSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Button>
      <Button
        isIcon
        mx="xs"
        bg="error"
        variant="text"
        height="0.4rem"
        width="0.4rem"
        borderRadius="full"
        color="lowestContainer"
        onClick={handleCancel}
      >
        <TimesSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Button>
    </Box>
  );
};

export default IncineratorTableActions;

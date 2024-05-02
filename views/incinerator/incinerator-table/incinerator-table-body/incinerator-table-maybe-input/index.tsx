import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PencilSVG } from '@/svg';

import {
  IncineratorForm,
  IncineratorTableColumnProps,
} from '../../../incinerator.types';
import IncineratorTableInput from './incinerator-table-input';

const IncineratorTableMaybeInput: FC<
  Omit<IncineratorTableColumnProps, 'value'>
> = ({ index }) => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const value = useWatch({ control, name: `objects.${index}.value` });
  const editable = useWatch({ control, name: `objects.${index}.editable` });
  const isEditing = useWatch({ control, name: `objects.${index}.isEditing` });

  const handleEditing = () => {
    setValue(`objects.${index}.active`, true);
    setValue(`objects.${index}.isEditing`, true);
  };

  if (isEditing) return <IncineratorTableInput index={index} />;

  return (
    <>
      <Typography
        p="xs"
        as="span"
        size="small"
        variant="body"
        borderRadius="full"
      >
        {!editable ? 1 : value}
      </Typography>
      {editable && (
        <Box
          display="flex"
          height="2.5rem"
          alignItems="center"
          justifyContent="flex-end"
          gap="s"
        >
          <Button
            isIcon
            width="1rem"
            height="1rem"
            variant="text"
            borderRadius="full"
            onClick={handleEditing}
          >
            <PencilSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Button>
        </Box>
      )}
    </>
  );
};

export default IncineratorTableMaybeInput;

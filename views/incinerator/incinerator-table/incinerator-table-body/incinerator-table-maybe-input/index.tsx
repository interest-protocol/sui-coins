import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, MouseEventHandler } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PencilSVG } from '@/svg';
import { formatMoney } from '@/utils';

import {
  IncineratorForm,
  IncineratorTableRowProps,
} from '../../../incinerator.types';
import IncineratorTableInput from './incinerator-table-input';

const IncineratorTableMaybeInput: FC<IncineratorTableRowProps> = ({
  index,
}) => {
  const { control, setValue, getValues } = useFormContext<IncineratorForm>();

  const isEditing = useWatch({ control, name: `objects.${index}.isEditing` });

  if (isEditing) return <IncineratorTableInput index={index} />;

  const kind = getValues(`objects.${index}.kind`);
  const value = getValues(`objects.${index}.value`);
  const editable = getValues(`objects.${index}.editable`);

  const isCoin = kind === 'Coin';

  const handleEditing: MouseEventHandler = (e) => {
    e.stopPropagation();
    getValues('objects').map((_, index) =>
      setValue(`objects.${index}.isEditing`, false)
    );

    setValue(`objects.${index}.active`, true);
    setValue(`objects.${index}.isEditing`, true);
  };

  return (
    <>
      <Typography
        p="xs"
        as="span"
        size="large"
        variant="body"
        borderRadius="full"
      >
        {isCoin ? formatMoney(Number(value)) : 1}
      </Typography>
      {editable && (
        <Box
          gap="s"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
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

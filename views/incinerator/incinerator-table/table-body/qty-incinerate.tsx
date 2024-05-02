import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PencilSVG } from '@/svg';

import {
  IncineratorForm,
  IncineratorTableColumnProps,
} from '../../incinerator.types';
import IncineratorTableBodyRowField from './row-field';

const QtyIncinerate: FC<Omit<IncineratorTableColumnProps, 'value'>> = ({
  index,
}) => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const editable = useWatch({ control, name: `objects.${index}.editable` });
  const isEditing = useWatch({ control, name: `objects.${index}.isEditing` });
  const value = useWatch({ control, name: `objects.${index}.value` });

  const handleEditing = () => {
    setValue(`objects.${index}.state`, true);
    setValue(`objects.${index}.isEditing`, true);
  };

  return (
    <>
      <Typography pr="m" as="td" size="small" variant="label" width="30%">
        <Box display="flex" justifyContent="space-between">
          {isEditing ? (
            <Box display="flex" justifyContent="space-between" gap="m">
              <IncineratorTableBodyRowField index={index} />
            </Box>
          ) : (
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
          )}
        </Box>
      </Typography>
    </>
  );
};

export default QtyIncinerate;

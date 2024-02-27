import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { MinusSVG, PlusSVG } from '@/svg';

import { SlippageInfoProps } from './manage-slippage-form.types';

const SlippageInfo: FC<SlippageInfoProps> = ({ isOpen, handleManageView }) => {
  const { control } = useFormContext();

  const settings = useWatch({ control, name: 'settings' });

  const ManageIcon = isOpen ? MinusSVG : PlusSVG;

  return (
    <Box
      px="xl"
      py="xs"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="xs"
    >
      <Typography variant="label" size="large" color="onSurface">
        Slippage:
        <Typography
          ml="xs"
          as="span"
          size="large"
          color="primary"
          variant="label"
        >
          {settings.slippage}%
        </Typography>
      </Typography>
      <Button
        isIcon
        variant="text"
        onClick={handleManageView}
        color="onSurface"
      >
        <ManageIcon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Button>
    </Box>
  );
};

export default SlippageInfo;

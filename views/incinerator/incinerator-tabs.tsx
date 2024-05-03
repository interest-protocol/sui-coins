import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FilterData } from './incinerator.data';
import { IncineratorForm } from './incinerator.types';

const variants = {
  collapsed: {
    height: 'auto',
  },
  rest: { height: 0 },
};

const IncineratorFilterTabs: FC = () => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const tab = useWatch({ control, name: 'tab' });

  return (
    <Box
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      borderBottom="1px solid"
      borderColor="outlineVariant"
    >
      {FilterData.map((item, index) => (
        <Box key={v4()} cursor="pointer" onClick={() => setValue('tab', index)}>
          <Typography variant="body" size="medium" textAlign="center" py="m">
            {item}
          </Typography>
          {tab === index && (
            <Motion
              px="xl"
              initial="rest"
              variants={variants}
              animate="collapsed"
              overflow="hidden"
              borderBottom="2px solid"
              borderBottomColor="primary"
              layoutId="underline"
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default IncineratorFilterTabs;

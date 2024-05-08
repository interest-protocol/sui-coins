import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchSVG } from '@/svg';

import { IncineratorForm } from './incinerator.types';

const IncineratorHeader: FC = () => {
  const { register } = useFormContext<IncineratorForm>();

  return (
    <Box
      gap="l"
      p="xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Typography variant="title" size="large" fontSize="5xl" fontWeight="700">
        Incinerator
      </Typography>
      <Box width={['100%', '100%', '100%', '25rem']}>
        <TextField
          fontSize="medium"
          placeholder="Search"
          {...register('search')}
          nPlaceholder={{ opacity: 0.7 }}
          fieldProps={{
            width: '100%',
            height: '2.5rem',
            borderRadius: 'full',
          }}
          Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
        />
      </Box>
    </Box>
  );
};

export default IncineratorHeader;

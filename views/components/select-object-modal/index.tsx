import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ObjectData } from '@/context/all-objects/all-objects.types';
import { SearchSVG, TimesSVG } from '@/svg';

import {
  ObjectOrigin,
  SearchObjectForm,
  SelectObjectModalProps,
} from './select-object-modal.types';
import SelectObjectModalBody from './select-object-modal-body';
import SelectObjectFilter from './select-object-modal-filter';

const SelectObjectModal: FC<SelectObjectModalProps> = ({
  onSelect,
  closeModal,
}) => {
  const { control, register, setValue } = useForm<SearchObjectForm>({
    defaultValues: {
      search: '',
      filter: ObjectOrigin.Coins,
    },
  });

  const handleSelectObject = (object: ObjectData) => {
    onSelect(object);
    closeModal();
  };

  return (
    <Motion
      layout
      display="flex"
      bg="onPrimary"
      height="41rem"
      minWidth="22rem"
      maxHeight="90vh"
      maxWidth="25rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        p="m"
        display="grid"
        alignItems="center"
        justifyContent="space-between"
        gridTemplateColumns="2rem auto 2rem"
      >
        <Box />
        <Typography variant="title" size="large">
          Select Object
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box mx="xl" mt="l" display="flex" gap="3xs" flexDirection="column">
        <Box>
          <TextField
            fontSize="medium"
            placeholder="Sui"
            label="Search token"
            {...register('search')}
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
        </Box>
        <SelectObjectFilter control={control} setValue={setValue} />
      </Box>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        <SelectObjectModalBody
          control={control}
          handleSelectObject={handleSelectObject}
        />
      </Box>
    </Motion>
  );
};

export default SelectObjectModal;

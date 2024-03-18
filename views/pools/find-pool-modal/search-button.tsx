import { Button, Motion } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Routes, RoutesEnum } from '@/constants';
import { useModal } from '@/hooks/use-modal';

import FindPoolDialog from './find-pool-dialog';
import { FindPoolForm, FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<Pick<FindPoolModalProps, 'handleSearch'>> = ({
  handleSearch,
}) => {
  const { control } = useFormContext<FindPoolForm>();
  const { setModal, handleClose } = useModal();
  const { push } = useRouter();
  const { fields } = useFieldArray({
    control,
    name: 'tokens',
  });

  const handleCreatePool = () => {
    if (fields) {
      handleClose();
      handleSearch(fields);
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <FindPoolDialog
          title="Pool doesn't exist"
          description="If you like, you can create this pool"
          onClose={handleClose}
          onCreatePool={() => push(Routes[RoutesEnum.PoolCreate])}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );
  };

  return (
    <Button
      display="flex"
      variant="filled"
      minWidth="17rem"
      borderRadius="xs"
      justifyContent="center"
      onClick={handleCreatePool}
    >
      Search
    </Button>
  );
};

export default SearchButton;

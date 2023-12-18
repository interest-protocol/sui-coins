import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { ChangeEventHandler, DragEventHandler, FC, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FolderSVG } from '@/svg';

import { ICreateTokenForm } from '../create-token.types';
import { getBase64 } from '../create-token.utils';

const UploadImage: FC<{ setValue: UseFormSetValue<ICreateTokenForm> }> = ({
  setValue,
}) => {
  const [dragging, setDragging] = useState(false);
  const { colors } = useTheme() as Theme;

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return toast.error('Something went wrong');

    if (!file.type.includes('image/'))
      return toast.error('Make sure that you are sending a CSV File');

    const imageBase64 = await getBase64(file).catch(() =>
      toast.error('Something went wrong')
    );

    setValue('imageUrl', imageBase64);
  };

  const handleDropFile: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const item = e.dataTransfer.items[0];

      if (item.kind !== 'file' || !item.type.includes('image/'))
        return toast.error('Make sure that you are sending a CSV File');

      const file = item.getAsFile();

      if (!file) return toast.error('Something went wrong');

      const imageBase64 = await getBase64(file).catch(() =>
        toast.error('Something went wrong')
      );

      setValue('imageUrl', imageBase64);

      return;
    }

    const file = e.dataTransfer.files[0];

    if (!file) return toast.error('Something went wrong');

    if (!file.type.includes('image/'))
      return toast.error('Make sure that you are sending a CSV File');

    const imageBase64 = await getBase64(file).catch(() =>
      toast.error('Something went wrong')
    );

    setValue('imageUrl', imageBase64);
  };

  return (
    <Box
      p="l"
      gap="m"
      bg="surface"
      display="flex"
      borderRadius="s"
      borderWidth="1px"
      alignItems="center"
      onDrop={handleDropFile}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      borderStyle={dragging ? 'solid' : 'dashed'}
      borderColor={dragging ? 'primary' : 'outlineVariant'}
    >
      <Box
        display="flex"
        width="2.5rem"
        height="2.5rem"
        borderRadius="full"
        alignItems="center"
        justifyContent="center"
        bg={`${colors.primary}14`}
      >
        <FolderSVG maxWidth="1.4rem" maxHeight="1.4rem" width="100%" />
      </Box>
      <Typography size="large" variant="body">
        Drop your file here or{' '}
        <Typography
          as="label"
          size="large"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          htmlFor="file"
          variant="body"
          color="primary"
          cursor="pointer"
          textDecoration="underline"
        >
          upload
        </Typography>
        <Box display="none">
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
        </Box>
      </Typography>
    </Box>
  );
};

export default UploadImage;

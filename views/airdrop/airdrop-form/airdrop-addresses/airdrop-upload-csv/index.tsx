import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { ChangeEventHandler, DragEventHandler, FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FolderSVG } from '@/svg';

import { IAirdropForm } from '../../../airdrop.types';
import { csvToAirdrop } from '../../../airdrop.utils';
import AirdropUploadFileCard from './airdrop-upload-file-card';

const AirdropUploadFile: FC = () => {
  const { colors } = useTheme() as Theme;
  const [dragging, setDragging] = useState(false);
  const { setValue, control } = useFormContext<IAirdropForm>();

  const decimals = useWatch({ control, name: 'token.decimals' });
  const airdropList = useWatch({ control, name: 'airdropList' });

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return toast.error('Something went wrong');

    if (file.type !== 'text/csv')
      return toast.error('Make sure that you are sending a CSV File');

    const airdrop = csvToAirdrop(await file.text(), decimals, toast.error);

    setValue('airdropList', airdrop);
    setValue('step', 2);
  };

  const handleDropFile: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const item = e.dataTransfer.items[0];

      if (item.kind !== 'file' || item.type !== 'text/csv')
        return toast.error('Make sure that you are sending a CSV File');

      const file = item.getAsFile();

      if (!file) return toast.error('Something went wrong');

      const airdrop = csvToAirdrop(await file.text(), decimals, toast.error);
      setValue('airdropList', airdrop);

      return;
    }

    const file = e.dataTransfer.files[0];

    if (!file) return toast.error('Something went wrong');

    if (file.type !== 'text/csv')
      return toast.error('Make sure that you are sending a CSV File');

    const airdrop = csvToAirdrop(await file.text(), decimals, toast.error);
    setValue('airdropList', airdrop);
    setValue('step', 2);
  };

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        2. Upload CSV file{' '}
        <Typography
          as="strong"
          size="small"
          variant="body"
          color="primary"
          cursor="pointer"
          textDecoration="underline"
        >
          (<a href="/airdrop.csv">example file</a>)
        </Typography>
      </Typography>
      {airdropList ? (
        <AirdropUploadFileCard name="Airdrop List" size={airdropList.length} />
      ) : (
        <Box
          p="m"
          gap="m"
          bg="surface"
          display="flex"
          borderRadius="xs"
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
          <Typography size="large" variant="body" textAlign="center">
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
                accept="text/csv"
                onChange={handleChangeFile}
              />
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AirdropUploadFile;

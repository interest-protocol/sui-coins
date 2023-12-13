import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { FolderSVG } from '@/svg';

import { isFile } from './airdrop.utils';

const AirdropUploadFile: FC = () => {
  const { colors } = useTheme() as Theme;

  const [dragging, setDragging] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        2. Upload file
      </Typography>
      <Box
        p="2xl"
        gap="m"
        bg="surface"
        display="flex"
        borderRadius="xs"
        borderWidth="1px"
        alignItems="center"
        flexDirection="column"
        borderStyle={dragging ? 'solid' : 'dashed'}
        borderColor={dragging ? 'primary' : 'outlineVariant'}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();

          Array(...(e.dataTransfer.items || e.dataTransfer.files)).reduce(
            (acc, item) => {
              if (!isFile(item)) {
                if (item.kind !== 'file') return acc;

                const file = item.getAsFile();

                if (!file) return acc;

                return [...acc, file];
              }

              return [...acc, item];
            },
            [] as ReadonlyArray<File>
          );
        }}
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
        <Typography
          size="large"
          variant="body"
          maxWidth="9rem"
          textAlign="center"
        >
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
            <input type="file" id="file" />
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default AirdropUploadFile;

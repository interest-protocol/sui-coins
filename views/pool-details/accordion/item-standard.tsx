import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ClipboardSVG, InformationCircleSVG } from '@/svg';
import { copyToClipboard } from '@/utils';

import { PoolDetailsCollapseItemStandardProps } from './accordion.type';

const PoolDetailsCollapseItemStandard: FC<
  PoolDetailsCollapseItemStandardProps
> = ({ label, content, hasAddtionalInfo, isCopyClipBoard }) => {
  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  return (
    <Box
      py="s"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography size="medium" variant="body">
        {label}
      </Typography>
      <Box
        px="m"
        py="xs"
        display="flex"
        bg="onSurface"
        borderRadius="xs"
        alignItems="center"
        color="lowContainer"
        justifyContent="space-between"
        width={isCopyClipBoard ? '10rem' : 'auto'}
      >
        <Box
          mr="2xs"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          width={isCopyClipBoard ? '8rem' : 'auto'}
        >
          {content}
        </Box>
        {hasAddtionalInfo && (
          <InformationCircleSVG
            width="0.875rem"
            maxWidth="0.875rem"
            maxHeight="0.875rem"
            cursor="pointer"
          />
        )}
        {isCopyClipBoard && (
          <ClipboardSVG
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(content.toString(), clipBoardSuccessMessage);
            }}
            width="1.25rem"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
            cursor="pointer"
          />
        )}
      </Box>
    </Box>
  );
};

export default PoolDetailsCollapseItemStandard;

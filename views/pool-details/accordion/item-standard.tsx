import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ClipboardSVG, InformationCircleSVG } from '@/svg';
import { copyToClipboard } from '@/utils';

import { PoolDetailAccordionItemStandardProps } from './accordion.type';

const PoolDetailsCollapseItemStandard: FC<
  PoolDetailAccordionItemStandardProps
> = ({ label, content, popupInfo, isCopyClipBoard, labelColor }) => {
  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  return (
    <Box
      py="s"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        size="medium"
        color={labelColor ? labelColor : ' '}
        variant="body"
      >
        {label}
      </Typography>
      <Box
        px="m"
        py="xs"
        display="flex"
        bg="lowContainer"
        borderRadius="xs"
        color="onSurface"
        alignItems="center"
        justifyContent="space-between"
        width={isCopyClipBoard ? '10rem' : 'auto'}
      >
        <Box
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          width={isCopyClipBoard ? '8rem' : 'auto'}
          mr={isCopyClipBoard || popupInfo ? 'xs' : ''}
        >
          <Typography size="medium" variant="body">
            {content}
          </Typography>
        </Box>
        {popupInfo && (
          <TooltipWrapper
            bg="onSurface"
            tooltipPosition="left"
            tooltipContent={
              <Typography variant="body" size="small" color="surface">
                {popupInfo}
              </Typography>
            }
          >
            <InformationCircleSVG
              width="0.875rem"
              maxWidth="0.875rem"
              maxHeight="0.875rem"
              cursor="pointer"
            />
          </TooltipWrapper>
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

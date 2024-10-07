import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import React, { FC } from 'react';

import { COLOR_MAP, STATUS_ICON } from './dialog.data';
import { DialogProps, IDialogButton } from './dialog.types';

export const Dialog: FC<DialogProps> = ({
  title,
  status,
  message,
  fontFamily,
  primaryButton,
  secondaryButton,
}) => {
  const Icon = STATUS_ICON[status];

  return (
    <Box
      p="xl"
      width="25rem"
      maxWidth="100%"
      borderRadius="xs"
      alignItems="center"
      display="inline-flex"
      flexDirection="column"
      justifyContent="center"
      boxShadow="dropShadow.2xl"
      backgroundColor="lowestContainer"
      role="dialog"
    >
      <Box
        display="flex"
        minWidth="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          color={
            // eslint-disable-next-line no-constant-condition
            status === 'loading' || status === 'general'
              ? 'onSurface'
              : COLOR_MAP[status]
          }
          flex="1"
          textAlign="center"
          variant="title"
          size="large"
          {...(fontFamily && { fontFamily })}
        >
          {title}
        </Typography>
      </Box>
      <Box
        display="flex"
        maxWidth="22rem"
        minWidth="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        pt="xl"
        gap="m"
      >
        {status !== 'general' ? (
          status === 'loading' ? (
            <ProgressIndicator
              maxWidth="1.5rem"
              maxHeight="1.5rem"
              variant="loading"
            />
          ) : (
            <Box
              width="3rem"
              height="3rem"
              display="flex"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              color={COLOR_MAP[status]}
              boxShadow="inset 0px 0px 0px 4px #FFFFFFB8"
              backgroundColor={
                status == 'success'
                  ? '#BAF6CF'
                  : `${COLOR_MAP[status]}Container`
              }
            >
              <Icon
                maxWidth="1.3rem"
                maxHeight="1.3rem"
                width="100%"
                height="100%"
              />
            </Box>
          )
        ) : null}
        {React.isValidElement(message) ? (
          message
        ) : (
          <Typography
            color="onSurface"
            textAlign="center"
            lineHeight="m"
            variant="body"
            size="medium"
            {...(fontFamily && { fontFamily })}
          >
            {message}
          </Typography>
        )}
      </Box>
      {(secondaryButton || primaryButton) && (
        <Box
          pt="xl"
          display="flex"
          minWidth="100%"
          justifyContent="space-between"
          flexDirection="row"
        >
          {!!secondaryButton &&
            (React.isValidElement(secondaryButton)
              ? secondaryButton
              : !!(secondaryButton as IDialogButton).label && (
                  <Button
                    flex="1"
                    marginRight="s"
                    variant="outline"
                    borderRadius="xs"
                    justifyContent="center"
                    borderColor="outlineVariant"
                    onClick={(secondaryButton as IDialogButton).onClick}
                  >
                    {(secondaryButton as IDialogButton).label}
                  </Button>
                ))}
          {!!primaryButton &&
            (React.isValidElement(primaryButton)
              ? primaryButton
              : !!(primaryButton as IDialogButton)?.label && (
                  <Button
                    onClick={(primaryButton as IDialogButton).onClick}
                    backgroundColor={status === 'error' ? 'error' : ''}
                    justifyContent="center"
                    flex="3"
                    variant="filled"
                    borderRadius="xs"
                  >
                    {(primaryButton as IDialogButton).label}
                  </Button>
                ))}
        </Box>
      )}
    </Box>
  );
};

export * from './dialog.types';

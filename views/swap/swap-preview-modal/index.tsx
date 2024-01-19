/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  Dialog,
  Motion,
  Typography,
} from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { ArrowLeftSVG, TimesSVG } from '@/svg';

import ConfirmSwapButton from './preview-modal-button';
import PreviewModalInput from './preview-modal-input';
import PreviewModalSummary from './preview-modal-summary';
import { SelectTokenModalProps } from './swap-preview-modal.types';

const SwapPreviewModal: FC<SelectTokenModalProps> = ({
  onSelect,
  closeModal,
}) => {
  const [confirmSwap, setConfirmSwap] = useState(false);

  const handleConfirmSwap = () => {
    setConfirmSwap(!confirmSwap);
  };
  const anchorStyle = {
    color: '#0053DB',
    opacity: 0.6,
  };

  const router = useRouter();
  const goBack = () => {
    router.back();
    closeModal();
  };
  return (
    <Motion
      layout
      width="23.875rem"
      height="85vh"
      display="flex"
      bg="onPrimary"
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
        py="m"
        px="m"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        //Only to prevent an eslint error
        onClick={() => onSelect}
      >
        <Box />
        <Button variant="text" isIcon onClick={goBack} ml="-7rem">
          <ArrowLeftSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Button>
        <Typography variant="title" size="large">
          Swap
        </Typography>
        <Button variant="text" isIcon onClick={closeModal}>
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box>
        <PreviewModalInput label="from" value={390.09} />
        <PreviewModalInput label="to" alternativeText="Estimated" value={350} />
      </Box>
      <PreviewModalSummary exchangeRate={0.7} exchangeFee={3} networkFee={2} />
      <Box my="m" mx="m">
        <Typography variant="body" size="medium" color="outline">
          Network fees are set by “@network name”.
          <a href="#" target="blank" style={anchorStyle}>
            {' '}
            Learn more about fees.{' '}
          </a>
          Final amount may change due to market activity. By approving this Swap
          you agree to Interest protocol Refund Policy.
        </Typography>
      </Box>
      <Box mx="m">
        <ConfirmSwapButton handleConfirmSwap={handleConfirmSwap} />
      </Box>
      {confirmSwap && (
        <Dialog
          isOpen
          message="This is the error description. It can be anything you want and as long as you want. But please don't make it too long."
          primaryButton={{
            label: 'GOT IT',
            onClick: () => handleConfirmSwap(),
          }}
          secondaryButton={{
            label: 'CLOSE',
            onClick: () => handleConfirmSwap(),
          }}
          status="success"
          title="Title"
        />
      )}
    </Motion>
  );
};

export default SwapPreviewModal;

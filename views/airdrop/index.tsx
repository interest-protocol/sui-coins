import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { FixedPointMath } from '@/lib';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';

import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropChooseMethod from './airdrop-choose-method';
import AirdropCustomeAmountMethod from './airdrop-custome-amount-method';
import AirdropNftCoinsMethod from './airdrop-nft-coins-method';
import AirdropProgressIndicator from './airdrop-progress-indicator';
import AirdropSummaryModal from './airdrop-summary-modal';
import AirdropUploadFile from './airdrop-upload-file';
import AirdropUploadStatus from './airdrop-upload-status';

interface AirdropBodyProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

const AirdropBody: FC<AirdropBodyProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const { airdropList } = useWatch({ control });
  const [method, setMethod] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  let isDisabled =
    !airdropList ||
    !token?.balance ||
    token.balance <
      FixedPointMath.toNumber(
        airdropList?.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          BigNumber(0)
        ),
        token.decimals
      );

  const handleCloseSummaryModal = () => {
    setIsSummaryOpen(false);
  };
  const handleOpenSumaryModal = () => {
    setIsSummaryOpen(true);
  };

  const onSelectMethod = (el: string) => {
    setMethod(el);
    isDisabled = false;
  };

  return token ? (
    <>
      <AirdropChooseMethod onSelectMethod={onSelectMethod} />
      {method === 'CSV' && <AirdropUploadFile />}
      {(method === 'NFT' || method === 'Coins') && (
        <AirdropNftCoinsMethod method={method} />
      )}
      {method === 'Costume Amount' && <AirdropCustomeAmountMethod />}
      <AirdropSummaryModal
        method={method}
        isOpen={isSummaryOpen}
        onClose={handleCloseSummaryModal}
        setIsProgressView={setIsProgressView}
      />
      <Box display="flex" justifyContent="center">
        <Button
          disabled={isDisabled}
          variant="filled"
          borderRadius="xs"
          onClick={handleOpenSumaryModal}
        >
          Review & Confirm
        </Button>
      </Box>
    </>
  ) : null;
};

const Airdrop: FC = () => {
  const { reset } = useFormContext();
  const [isProgressView, setIsProgressView] = useState(false);

  return (
    <Layout>
      <Typography
        my="6xl"
        size="small"
        variant="display"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Airdrop
      </Typography>
      {isProgressView ? (
        <Box
          gap="s"
          mx="auto"
          mb="10xl"
          width="100%"
          display="flex"
          maxWidth="39.5rem"
          flexDirection="column"
        >
          <AirdropProgressIndicator
            goBack={() => {
              setIsProgressView(false);
              reset();
            }}
          />
          <AirdropUploadStatus />
        </Box>
      ) : (
        <Box
          p="xl"
          gap="4xl"
          mx="auto"
          mb="10xl"
          display="flex"
          borderRadius="m"
          maxWidth="39.5rem"
          bg="lowestContainer"
          flexDirection="column"
        >
          <AirdropChooseCoin />
          <AirdropBody setIsProgressView={setIsProgressView} />
        </Box>
      )}
    </Layout>
  );
};

export default Airdrop;

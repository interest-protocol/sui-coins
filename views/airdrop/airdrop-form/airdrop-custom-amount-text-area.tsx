import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TextareaField } from '@/components';

import { IAirdropForm } from '../airdrop.types';
import { textToAirdrop } from '../airdrop.utils';

const AirdropCustomAmountTextArea: FC = () => {
  const { setValue, getValues } = useFormContext<IAirdropForm>();

  return (
    <TextareaField
      fontSize="0.75rem !important"
      defaultValue={getValues('airdropList')
        ?.map(({ address }) => address)
        .join('\n')}
      fieldProps={{ borderColor: 'outlineVariant' }}
      placeholder={`0x0000000000000000000000000000000000000000000000000000000000000001\n0x0000000000000000000000000000000000000000000000000000000000000002\n0x0000000000000000000000000000000000000000000000000000000000000003`}
      label="Enter Separate wallet addresses on a new line"
      onChange={(e) => {
        const airdropValue = textToAirdrop(
          e.target.value,
          getValues('commonAmount'),
          getValues('token.decimals'),
          toast.error
        );

        setValue('airdropList', airdropValue);
      }}
    />
  );
};

export default AirdropCustomAmountTextArea;

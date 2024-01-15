import TextareaField from 'elements/textearea-field';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IAirdropForm } from '../airdrop.types';
import { textToAirdrop } from '../airdrop.utils';

const AirdropCustomAmountTextArea: FC = () => {
  const { setValue, getValues } = useFormContext<IAirdropForm>();

  return (
    <TextareaField
      fieldProps={{ borderColor: 'outlineVariant' }}
      label="Enter Separate wallet addresses on a new line"
      onChange={(e) => {
        const airdropValue = textToAirdrop(
          e.target.value,
          getValues('commonAmount'),
          toast.error
        );

        setValue('airdropList', airdropValue);
      }}
    />
  );
};

export default AirdropCustomAmountTextArea;

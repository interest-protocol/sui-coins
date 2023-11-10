import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Name is a required field'),
  symbol: yup
    .string()
    .required('Symbol is a required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  description: yup.string(),
  imageUrl: yup.string(),
  totalSupply: yup
    .string()
    .matches(/[^0]+/, 'You cannot add numbers less than 0')
    .required('Total Supply is a required field'),
  decimals: yup
    .number()
    .min(0, 'You cannot add numbers less than 0')
    .max(11, 'You cannot add numbers greater than 11'),
  fixedSupply: yup.boolean().required('Fixed Supply is an required field'),
});

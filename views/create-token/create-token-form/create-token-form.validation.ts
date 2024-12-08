import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Name is a required field'),
  symbol: yup
    .string()
    .required('Symbol is a required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  description: yup
    .string()
    .required('You must provide a description')
    .notOneOf(
      [yup.ref('name'), yup.ref('symbol')],
      'The description must be different than the name and symbol'
    ),
  imageUrl: yup.string(),
  totalSupply: yup
    .string()
    .test(
      'total-supply-validation',
      'Total Supply must be greater than 0 when Fixed Supply is active',
      function (value) {
        const { fixedSupply } = this.parent;
        if (fixedSupply) {
          return value !== undefined && parseFloat(value) > 0;
        }
        return true;
      }
    )
    .required('Total Supply is a required field'),
  decimals: yup
    .number()
    .min(0, 'You cannot add numbers less than 0')
    .max(11, 'You cannot add numbers greater than 11'),
  fixedSupply: yup.boolean().required('Fixed Supply is an required field'),
});

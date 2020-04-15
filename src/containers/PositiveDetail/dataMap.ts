import Validations from '../../constants/validations';

export default [
  {
    name: 'phone',
    type: 'input',
    label: 'phoneNumber',
    rules: [{ required: true, message: 'Please input' }],
  },
];

import Validations from '../../constants/validations';

export default [
  {
    name: 'phone',
    type: 'input',
    label: '',
    labelJa: '電話番号',
    rules: [{ required: true, message: 'Please input' }],
  },
];

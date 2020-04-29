import Validation from '../../constants/Validation';

export default [
  {
    name: 'name',
    type: 'input',
    label: 'name',
    rules: [Validation.required, Validation.email],
  },
];

import Validation from '../../constants/Validation';

export default [
  {
    name: 'name',
    type: 'input',
    label: 'organizationName',
    rules: [Validation.required],
  },
];

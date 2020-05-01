import Validation from '../../constants/Validation';

export default [
  {
    name: 'name',
    type: 'input',
    label: 'organizationName',
    rules: [Validation.required],
  },
  {
    name: 'message',
    type: 'input',
    label: 'message',
    rules: [Validation.required],
  }
];

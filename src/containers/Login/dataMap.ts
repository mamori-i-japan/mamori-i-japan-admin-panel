import Validation from '../../constants/Validation';

export default [
  {
    name: 'email',
    type: 'input',
    label: 'email',
    rules: [Validation.required, Validation.email],
  },
  // {
  //   name: 'password',
  //   type: 'password',
  //   label: 'password',
  //   rules: [{ required: true, message: 'Please input!' }],
  // },
];

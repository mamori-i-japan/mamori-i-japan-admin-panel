// import Validation from '../../constants/Validation';

export default [
  {
    name: 'email',
    type: 'input',
    label: 'email',
    rules: [
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
      { required: true, message: 'Please input!' },
    ],
  },
];

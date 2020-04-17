// import Validation from '../../constants/Validation';

// TODO: move rules to vallidation libs
export default [
  {
    name: 'email',
    type: 'input',
    label: 'mail',
    rules: [
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
      { required: true, message: 'Please input!' },
    ],
  },
  // {
  //   name: 'password',
  //   type: 'password',
  //   label: 'password',
  //   rules: [{ required: true, message: 'Please input!' }],
  // },
];

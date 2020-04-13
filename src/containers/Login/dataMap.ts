import Messages from '../../constants/messages';
import Validations from '../../constants/validations';

export default [
  {
    key: 'email',
    type: 'input',
    label: 'メールアドレス',
    rules: [{ required: true, message: 'Please input your username!' }],
  },
  {
    key: 'password',
    type: 'password',
    label: 'パスワード',
    rules: [{ required: true, message: 'Please input your username!' }],
  },
];

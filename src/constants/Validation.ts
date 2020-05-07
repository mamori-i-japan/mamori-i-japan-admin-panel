import { langCode } from './index';
import { langLocales } from '../locales';

export default {
  required: {
    required: true,
    message: langLocales[langCode].isRequired,
    validateTrigger: 'submit',
  },
  email: {
    type: 'email',
    message: langLocales[langCode].isValidEmail,
    validateTrigger: 'submit',
  },
};

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
  halfWidth: () => ({
    validator(rule: any, value: string) {
      console.log(value);
      if (!value || !value.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
        return Promise.resolve();
      }
      return Promise.reject(langLocales[langCode].isInvalidURL);
    },
  }),
};

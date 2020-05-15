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
  url: () => ({
    validator(rule: any, value: string) {
      //eslint-disable-next-line
      if (!value || value.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)) {
        return Promise.resolve();
      }
      return Promise.reject(langLocales[langCode].isInvalidURL);
    },
  }),
};

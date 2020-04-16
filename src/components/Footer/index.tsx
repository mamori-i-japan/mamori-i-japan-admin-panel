import React, { useContext } from 'react';
import { AppFooter } from './style';

import { I18nContext } from '../../locales';

export default () => {
  const { translate } = useContext(I18nContext);

  return <AppFooter>{translate('footerCopyright')}</AppFooter>;
};

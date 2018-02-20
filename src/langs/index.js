import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import ruLang from './ru';

addLocaleData([...en, ...ru]);

const allMessages = {
  ru: ruLang
};

export const getMessages = (locale = 'en') => {
  return allMessages[locale];
}
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import enLang from './en';
import ruLang from './ru';

addLocaleData([...en, ...ru]);

const allMessages = {
  "en": enLang,
  "en-US": enLang,
  "ru-RU": ruLang,
  "ru": ruLang
};

export const getMessages = (locale) => {
  if (!allMessages[locale]) {
    locale = 'en';
  }

  return allMessages[locale];
}
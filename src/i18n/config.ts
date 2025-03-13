import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en';
import { pl } from './translations/pl';
import { de } from './translations/de';
import { uk } from './translations/uk';
import { ru } from './translations/ru';

const resources = {
  en,
  pl,
  de,
  uk,
  ru
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'pl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
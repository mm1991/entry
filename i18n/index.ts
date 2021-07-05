import {stores} from '../store';
import i18n from 'i18n-js';
import en from './en';
import zh from './zh';

i18n.translations = {
  en,
  zh,
};

i18n.locale = stores.lang;
i18n.fallbacks = true;

// 根据store中lang参数展示语言
const i18nT = (name: string) => {
  return i18n.t(name, {locale: stores.lang});
};

export {i18n, i18nT};

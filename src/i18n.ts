import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { z } from "zod";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {zodI18nMap} from "zod-i18n-map";

import enZod from "zod-i18n-map/locales/en/zod.json";
import zhCnZod from "zod-i18n-map/locales/zh-CN/zod.json";

void i18n
  // load translation from `/public/locales` using http
  .use(Backend)
  // auto detect user language
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    partialBundledLanguages: true,
    resources: {
      'en-US': { zod: enZod },
      'zh-CN': { zod: zhCnZod }
    }
  });

if (import.meta.hot) {
  import.meta.hot.on("locales-update", () => {
    void i18n.reloadResources().then(() => {
      void i18n.changeLanguage(i18n.language);
    });
  });
}

z.setErrorMap(zodI18nMap);

export default i18n;
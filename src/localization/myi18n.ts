import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { noop } from "lodash";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

const persistedLangStorageKey = "daily-questions/language";
// https://www.i18next.com/misc/creating-own-plugins#languagedetector
const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector" as const,
  async: true, // flags below detection to be async
  detect: async (callback) => {
    const cachedLang = await AsyncStorage.getItem(persistedLangStorageKey);
    callback(cachedLang ?? Localization.locale.slice(0, 2));
  },
  init: noop,
  cacheUserLanguage: (lng) => {
    AsyncStorage.setItem("daily-questions/language", lng);
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: translations,
    fallbackLng: "en",
    // debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss attacks
    },
    cleanCode: true,
  });
export const myi18n = i18next;

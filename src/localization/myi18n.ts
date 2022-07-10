import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss attacks
    },
  });
export const myi18n = i18next;

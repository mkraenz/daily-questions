import { useTranslation as originalUseTranslation } from "react-i18next";
import { TranslationKeys } from "./translations";

export const useTranslation = (
  ...args: Parameters<typeof originalUseTranslation>
) => {
  const { t, i18n } = originalUseTranslation(...args);
  const safeT = (key: TranslationKeys, obj?: {}) => t(key, obj);
  return { i18n, t: safeT };
};

export type TranslateFunction = ReturnType<typeof useTranslation>["t"];

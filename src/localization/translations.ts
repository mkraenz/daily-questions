const en = {
  translation: {
    darkMode: "Dark Mode",
    language: "Language",
  },
  // settings: {},
  // dailies: {},
  // questions: {},
};

export type TranslationKeys = `translation:${keyof typeof en["translation"]}`;
// | `settings:${keyof typeof en["settings"]}`;

type Translations = {
  [key: string]: typeof en;
};

export const translations: Translations = {
  en,
  de: {
    translation: {
      darkMode: "Nachtmodus",
      language: "Sprache",
    },
  },
  ja: {
    translation: {
      darkMode: "ダークモード",
      language: "言葉",
    },
  },
};

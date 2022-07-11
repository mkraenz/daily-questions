const en = {
  translation: {
    darkMode: "Dark Mode",
    language: "Language: {{language}}",
  },
  statistics: {
    clearHistory: "Clear History",
    ["last7days"]: "last 7 days",
    ["last30days"]: "last 30 days",
    ["last1year"]: "last 1 year",
    lifetime: "lifetime",
  },
  // settings: {},
  // dailies: {},
  // questions: {},
};

export type TranslationKeys =
  | `translation:${keyof typeof en["translation"]}`
  | `statistics:${keyof typeof en["statistics"]}`;

type Translations = {
  [key: string]: typeof en;
};

export const translations: Translations = {
  en,
  de: {
    translation: {
      darkMode: "Nachtmodus",
      language: "Sprache: {{language}}",
    },
    statistics: {
      clearHistory: "Verlauf löschen",
      ["last7days"]: "letzte 7 Tage",
      ["last30days"]: "Letzte 30 Tage",
      ["last1year"]: "Letztes 1 Jahr",
      lifetime: "Lebensdauer",
    },
  },
  ja: {
    translation: {
      darkMode: "ダークモード",
      language: "言葉: {{language}}",
    },
    statistics: {
      clearHistory: "履歴をクリア",
      ["last7days"]: "過去 7 日間",
      ["last30days"]: "過去 30 日間",
      ["last1year"]: "過去 1 年間",
      lifetime: "有効期間",
    },
  },
};

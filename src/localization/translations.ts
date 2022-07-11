const en = {
  weekdays: {
    Sun: "Sun",
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
  },
  translation: {},
  statistics: {
    clearHistory: "Clear History",
    ["last7days"]: "last 7 days",
    ["last30days"]: "last 30 days",
    ["last1year"]: "last 1 year",
    lifetime: "lifetime",
  },
  settings: {
    showAppbar: "Show App Bar in Dailies",
    darkMode: "Dark Mode",
    language: "Language: {{language}}",
  },
  dailies: {
    next: "Next",
    confirm: "Confirm",
    share: "Share",
    confirmAndShare: "Confirm and Share",
    confirmedSuccessfully: "Dailies added to history",
    ok: "OK",
    summaryHeader: "Your Dailies from {{today}}",
    resetButtonAllyLabel: "Reset today's dailies",
    resetButtonAllyHint: "Opens a dialog to confirm resetting today's dailies",
    confirmResetDialogMessage:
      "Do you really want to reset today's dailies? Your history will be preserved.",
    resetDialogHeader: "Reset Dailies",
    cancel: "Cancel",
  },
  questions: {},
};

// Typescript magic to have more type-safety in custom useTranslation() hook
type Keys = keyof typeof en;
type SubPropsKeys<S> = S extends Keys ? keyof typeof en[S] : never;
type TranslationKey<S extends Keys> = `${S}:${SubPropsKeys<S>}`;
// MANUALLY add additional properties of `en` here to make them available in useTranslation() hook
export type TranslationKeys =
  | TranslationKey<"weekdays">
  | TranslationKey<"translation">
  | TranslationKey<"statistics">
  | TranslationKey<"settings">
  | TranslationKey<"dailies">
  | TranslationKey<"questions">;

type Translations = {
  [key: string]: typeof en;
};

export const translations: Translations = {
  en,
  de: {
    weekdays: {
      Sun: "So.",
      Mon: "Mo.",
      Tue: "Di.",
      Wed: "Mi.",
      Thu: "Do.",
      Fri: "Fr.",
      Sat: "Sa.",
    },
    translation: {},
    statistics: {
      clearHistory: "Verlauf löschen",
      ["last7days"]: "letzte 7 Tage",
      ["last30days"]: "Letzte 30 Tage",
      ["last1year"]: "Letztes 1 Jahr",
      lifetime: "Lebensdauer",
    },
    settings: {
      showAppbar: "App-Leiste in Dailies anzeigen",
      darkMode: "Nachtmodus",
      language: "Sprache: {{language}}",
    },
    dailies: {
      next: "Weiter",
      confirm: "Bestätigen",
      share: "Teilen",
      confirmAndShare: "Bestätigen und Teilen",
      confirmedSuccessfully: "Dailies zum Verlauf hinzugefügt",
      ok: "OK",
      summaryHeader: "Deine Dailies vom {{today}}",
      resetButtonAllyLabel: "Heutige Dailies zurücksetzen",
      resetButtonAllyHint:
        "Öffnet einen Dialog zum Bestätigen des Zurücksetzens der heutigen Dailies",
      confirmResetDialogMessage:
        "Möchtest du wirklich deine heutigen Dailies zurücksetzen? Dein Verlauf wird beibehalten.",
      resetDialogHeader: "Dailies zurücksetzen",
      cancel: "Abbrechen",
    },
    questions: {},
  },
  ja: {
    weekdays: {
      Sun: "日曜日",
      Mon: "月曜日",
      Tue: "火曜日",
      Wed: "水曜日",
      Thu: "木曜日",
      Fri: "金曜日",
      Sat: "土曜日",
    },
    translation: {},
    statistics: {
      clearHistory: "履歴をクリア",
      ["last7days"]: "過去 7 日間",
      ["last30days"]: "過去 30 日間",
      ["last1year"]: "過去 1 年間",
      lifetime: "有効期間",
    },
    settings: {
      showAppbar: "アプリバーをDailiesで表紙する",
      darkMode: "ダークモード",
      language: "言葉: {{language}}",
    },
    dailies: {
      next: "次へ",
      confirm: "確認",
      share: "共有",
      confirmAndShare: "確認して共有する",
      confirmedSuccessfully: "Dailiesを履歴に追加しました",
      ok: "OK",
      summaryHeader: "{{today}}のDailies",
      resetButtonAllyLabel: "今日のDailiesをリセットする",
      resetButtonAllyHint:
        "ダイアログを開いて今日のDailiesのリセットを確認してください",
      confirmResetDialogMessage:
        "本当に今日のDailiesをリセットしますか?履歴は保存されます。",
      resetDialogHeader: "Dailiesをリセットする",
      cancel: "キャンセル",
    },
    questions: {},
  },
};

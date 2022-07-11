const en = {
  routes: {
    dailies: "Dailies",
    statistics: "Statistics",
    customizeQuestions: "Customize Questions",
    settings: "Settings",
    addNewQuestion: "Add New Question",
    editQuestion: "Edit Question",
  },
  general: {
    navigateBackAllyHint: "Navigate back to previous screen",
    confirm: "Confirm",
    cancel: "Cancel",
    openDrawerA11yLabel: "Open drawer navigation menu",
  },
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
    clearHistory: "DANGER: Clear History",
    ["last7days"]: "last 7 days",
    ["last30days"]: "last 30 days",
    ["last1year"]: "last 1 year",
    lifetime: "lifetime",
    insufficientDataInTimeSpan:
      "You completed your dailies {{numOfEntries}} times in the selected time span. Your statistics show up once you've completed at least 2 dailies.",
    mockHistory: "DANGER: replace history by test data",
  },
  settings: {
    showAppbar: "Show App Bar in Dailies",
    darkMode: "Dark Mode",
    language: "Language: {{language}}",
  },
  dailies: {
    next: "Next",
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
  },
  questions: {
    addNewQuestion: "Add new question",
    listItemA11yHint:
      "Tap to edit the question. To change the questions position during your dailies, long tap, then drag and drop to your preferred position.",
    title: "Title*",
    longQuestion: "Full Question",
    save: "Save Changes",
    archive: "Archive Question",
    type: "Answer type: {{type}}",
    typepoints: "Points",
    typefulltext: "Fulltext",
    confirmArchival: "Confirm Archival",
    archivalDialogDescription:
      "Do you really want to archive this question? Unconfirmed progress of today's dailies will be reset.",
  },
};

// Typescript magic to have more type-safety in custom useTranslation() hook
type Keys = keyof typeof en;
type SubPropsKeys<S> = S extends Keys ? keyof typeof en[S] : never;
type TranslationKey<S extends Keys> = `${S}:${SubPropsKeys<S>}`;
// MANUALLY add additional properties of `en` here to make them available in useTranslation() hook
export type TranslationKeys =
  | TranslationKey<"routes">
  | TranslationKey<"general">
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
    routes: {
      dailies: "Dailies",
      statistics: "Statistiken",
      customizeQuestions: "Fragen bearbeiten",
      settings: "Einstellungen",
      addNewQuestion: "Neue Frage hinzufügen",
      editQuestion: "Frage bearbeiten",
    },
    general: {
      navigateBackAllyHint: "Zurück zur vorherigen Ansicht",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
      openDrawerA11yLabel: "Navigationsleiste öffnen",
    },
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
      clearHistory: "GEFAHR: Verlauf löschen",
      ["last7days"]: "letzte 7 Tage",
      ["last30days"]: "Letzte 30 Tage",
      ["last1year"]: "Letztes 1 Jahr",
      lifetime: "Lebensdauer",
      insufficientDataInTimeSpan:
        "Du hast deine Dailies {{numOfEntries}} mal im ausgewählten Zeitraum abgeschlossen. Deine Statistiken werden hier angezeigt, sobald du mindestens 2 Dailies abgeschlossen hast.",
      mockHistory: "GEFAHR: Verlauf durch Testdaten ersetzen",
    },
    settings: {
      showAppbar: "App-Leiste in Dailies anzeigen",
      darkMode: "Nachtmodus",
      language: "Sprache: {{language}}",
    },
    dailies: {
      next: "Weiter",
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
    },
    questions: {
      addNewQuestion: "Neue Frage hinzufügen",
      listItemA11yHint:
        "Zum Bearbeiten der Frage tippen. Um die Position der Frage in der Liste zu ändern, lange tippen, dann Drag & Drop an die gewünschte Position.",
      title: "Titel*",
      longQuestion: "Vollständige Frage",
      save: "Änderungen speichern",
      archive: "Frage archivieren",
      type: "Antworttyp: {{type}}",
      typepoints: "Punkte",
      typefulltext: "Volltext",
      confirmArchival: "Archivierung bestätigen",
      archivalDialogDescription:
        "Möchtest du diese Frage wirklich archivieren? Unbestätigter Fortschritt in den heutigen Dailies wird zurückgesetzt.",
    },
  },
  ja: {
    routes: {
      dailies: "Dailies",
      statistics: "系統情報",
      customizeQuestions: "質問をカスタマイズ",
      settings: "設定",
      addNewQuestion: "新しい質問を追加",
      editQuestion: "質問を編集",
    },
    general: {
      navigateBackAllyHint: "前のスクリーンに戻る",
      confirm: "確認",
      cancel: "キャンセル",
      openDrawerA11yLabel: "ナビゲーションドロワーを開く",
    },
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
      clearHistory: "危険: 履歴をクリア",
      ["last7days"]: "過去 7 日間",
      ["last30days"]: "過去 30 日間",
      ["last1year"]: "過去 1 年間",
      lifetime: "有効期間",
      insufficientDataInTimeSpan:
        "選択した期間内には {{numOfEntries}} 回Dailiesを完了しています。Dailiesを2回完了した後にはの統計情報が表示されます。",
      mockHistory: "危険: 履歴をテストデータで置き換える",
    },
    settings: {
      showAppbar: "アプリバーをDailiesで表紙する",
      darkMode: "ダークモード",
      language: "言葉: {{language}}",
    },
    dailies: {
      next: "次へ",
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
    },
    questions: {
      addNewQuestion: "新しい質問を追加する",
      listItemA11yHint:
        "質問を編集するためにタップしてください。質問の位置を変えるために長くタップしてドラッグ・アンド・ドロップください。",
      title: "タイトル*",
      longQuestion: "質問の全体",
      save: "変更を保存する",
      archive: "質問をアーカイブする",
      type: "答えのタイプ: {{type}}",
      typepoints: "ポイント",
      typefulltext: "全文",
      confirmArchival: "アーカイブの確認",
      archivalDialogDescription:
        "本当にこの質問をアーカイブしますか?未確認のk今日のDailiesはリセットされます。",
    },
  },
};

const en = {
  routes: {
    dailies: "Dailies",
    statistics: "Statistics",
    customizeQuestions: "Customize Questions",
    settings: "Settings",
    addNewQuestion: "Add New Question",
    editQuestion: "Edit Question",
    history: "History",
    historicEntry: "Historic Entry",
  },
  general: {
    navigateBackAllyHint: "Navigate back to previous screen",
    confirm: "Confirm",
    cancel: "Cancel",
    ok: "OK",
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
  statistics: {
    clearHistory: "DANGER: Clear History",
    ["last7days"]: "last 7 days",
    ["last30days"]: "last 30 days",
    ["last1year"]: "last 1 year",
    lifetime: "lifetime",
    insufficientDataInTimeSpan:
      "You completed your dailies {{numOfEntries}} times in the selected time span. Your statistics show up once you've completed at least 2 dailies.",
    mockHistory: "DANGER: replace history by test data",
    timeSpanSelectMenuA11yLabel: "Close time span selection menu",
  },
  settings: {
    showAppbar: "Show App Bar in Dailies",
    darkMode: "Dark Mode",
    language: "Language: {{language}}",
    uniteConfirmAndShare: "Unite Confirm and Share Buttons in Dailies' Summary",
    startOfNextDay: "Start of Next Day: {{time}}",
    enableDevMode: "Development Mode",
    devModeDialogTitle: "Enable Development Mode?",
    devModeDialogDescription:
      "This will enable experimental features. This may result in permanent (!) damage your app data. Do you really want to enable development mode?",
    exportHistory: "Export questions & history",
    importHistory: "Import questions & history",
    importHistoryDialogTitle: "Confirm Import",
    importHistoryDialogDescription:
      "Warning! This will permanently overwrite your current history and questions. Do you really want to import history and questions from clipboard?",
    importHistoryErrorDialogTitle: "Import Failed",
    importHistoryErrorDialogDescription:
      "Importing history and questions from clipboard failed. Please make sure your copied history string is valid. Your existing history and questions were NOT changed.",
    importHistorySuccessMessage: "Import successful",
    notificationTitle: "It's time for your Dailies.",
    notificationTime: "Daily notification at {{time}}",
    notificationsEnabled: "Daily notifications enabled",
  },
  dailies: {
    next: "Next",
    nextA11yHint: "Navigate to next question or to summary",
    shortAnswerListA11yLabel:
      "Provided answers to questions with points: {{ answers }}",
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
    confirmResetDialogConfirmButtonA11yHint:
      "Resets answers of today's dailies and navigates to the first question",
    noQuestions:
      "No questions available. Please add at least one question to start your self-improvement journey.",
    noQuestionsButton: "Add New Question",
    goto: 'Go back to question "{{questionTitle}}"',
    answerRowA11yLabel: "{{ questionTitle }}: {{ answer }}",
    pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
    pointsQuestionInputA11yHint:
      "Enter your answer from 1 to 10 points, enter 0 for 10 points. After input, the app automatically navigates to next question or to summary.",
  },
  questions: {
    addNewQuestion: "Add new question",
    addNewQuestionA11yHint: 'Navigate to "Add New Question"',
    listItemA11yHint: "Go to Edit question", // long press does not work with Android TalkBack
    title: "Title*",
    titleInputA11yLabel: "Title of the question, required input.",
    placeHolderExample: "Example: {{ example }}",
    longQuestion: "Full Question",
    longQuestionInputA11yLabel:
      "Full Question of the question, optional input.",
    save: "Save Changes",
    saveA11yHint: "Saves changes to question and return to questions list",
    archive: "Archive Question",
    archiveA11yHint: "Opens a dialog to confirm archival",
    type: "Answer type: {{type}}",
    typepoints: "Points",
    typefulltext: "Fulltext",
    typeSelectMenuBackOverlayA11yLabel: "Close answer type selection menu",
    typeSelectMenuButtonA11yHint: "Opens answer type selection menu",
    confirmArchival: "Confirm Archival",
    archivalDialogDescription:
      "Do you really want to archive this question? Unconfirmed progress of today's dailies will be reset.",
    archivalDialogConfirmA11yHint:
      "Archive question and return to questions list",
    create: "Create",
    createButtonA11yHint: "Create question and go back to questions list.",
  },
  defaultQuestions: {
    Goals: "Goals",
    Progress: "Progress",
    Meaning: "Meaning",
    Happiness: "Happiness",
    Social: "Social",
    Engagement: "Engagement",
    Highlight: "Highlight",
    questionLongGoals: "Did I do my best to set clear goals today?",
    questionLongProgress:
      "Did I do my best to make progress towards my goals today?",
    questionLongMeaning:
      "Did I do my best to find meaning in what I am doing today?",
    questionLongHappiness: "Did I do my best to be happy today?",
    questionLongSocial:
      "Did I do my best to build positive relationships today?",
    questionLongEngagement: "Did I do my best to be fully engaged today?",
    questionLongHighlight: "What was my personal highlight today and why?",
  },
  history: {
    questionNotFound: "Not found",
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
  | TranslationKey<"statistics">
  | TranslationKey<"settings">
  | TranslationKey<"dailies">
  | TranslationKey<"questions">
  | TranslationKey<"defaultQuestions">
  | TranslationKey<"history">;

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
      history: "Verlauf",
      historicEntry: "Verlaufseintrag",
    },
    general: {
      navigateBackAllyHint: "Zurück zur vorherigen Ansicht",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
      ok: "OK",
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
    statistics: {
      clearHistory: "GEFAHR: Verlauf löschen",
      ["last7days"]: "letzte 7 Tage",
      ["last30days"]: "Letzte 30 Tage",
      ["last1year"]: "Letztes 1 Jahr",
      lifetime: "Lebensdauer",
      insufficientDataInTimeSpan:
        "Du hast deine Dailies {{numOfEntries}} mal im ausgewählten Zeitraum abgeschlossen. Deine Statistiken werden hier angezeigt, sobald du mindestens 2 Dailies abgeschlossen hast.",
      mockHistory: "GEFAHR: Verlauf durch Testdaten ersetzen",
      timeSpanSelectMenuA11yLabel: "Zeitraumauswahlmenü schließen",
    },
    settings: {
      showAppbar: "App-Leiste in Dailies anzeigen",
      darkMode: "Nachtmodus",
      language: "Sprache: {{language}}",
      uniteConfirmAndShare:
        "Tasten für Bestätigen und Teilen in Zusammenfassung der Dailies vereinen",
      startOfNextDay: "Start des nächsten Tages: {{time}}",
      enableDevMode: "Entwicklermodus aktivieren",
      devModeDialogTitle: "Entwicklermodus aktivieren?",
      devModeDialogDescription:
        "Der Entwicklermodus aktiviert experimentelle Funktionen. Dies kann deine App und darin enthaltene Daten dauerhaft (!) kaputt machen. Bist du dir sicher, dass du den Entwicklermodus aktivieren möchtest?",
      exportHistory: "Verlauf & Fragen exportieren",
      importHistory: "Verlauf & Fragen importieren",
      importHistoryDialogTitle: "Import bestätigen",
      importHistoryDialogDescription:
        "Achtung! Diese Aktion überschreibt deinen aktuellen Verlauf und deine Fragen dauerhaft. Möchtest du wirklich mit dem Import eines neuen Verlaufs von der Zwischenablage fortfahren?",
      importHistoryErrorDialogTitle: "Import fehlgeschlagen",
      importHistoryErrorDialogDescription:
        "Der Verlauf und die Fragen in deiner Zwischenablage konnte nicht importiert werden. Bitte stelle sicher, dass der kopierte Verlaufsstring gültig ist. Dein aktueller Verlauf und deine Fragen wurde NICHT geändert.",
      importHistorySuccessMessage: "Import erfolgreich",
      notificationTitle: "Zeit für deine Dailies.",
      notificationTime: "Benachrichtungen um {{time}}",
      notificationsEnabled: "Benachrichtigungen aktiviert",
    },
    dailies: {
      next: "Weiter",
      nextA11yHint: "Zur nächsten Frage oder Zusammenfassung navigieren",
      shortAnswerListA11yLabel:
        "Gegebene Antworten zu Punktefragen: {{ answers }}",
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
      confirmResetDialogConfirmButtonA11yHint:
        "Setzt Antworten zu heutigen Dailies zurück und navigiert zur ersten Frage",
      noQuestions:
        "Keine Fragen verfügbar. Bitte füge mindestens eine Frage hinzu um deine Reise zu persönlicher Weiterentwicklung zu starten.",
      noQuestionsButton: "Neue Frage hinzufügen",
      goto: 'Zurücknavigieren zur Frage „{{ questionTitle }}"',
      answerRowA11yLabel: "{{ questionTitle }}: {{ answer }}",
      pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
      pointsQuestionInputA11yHint:
        "Antwort von 1 bis 10 Punkten eingeben. Nach der Eingabe, navigiert die App zur nächsten unbeantworteten Frage oder zur Zusammenfassung.",
    },
    questions: {
      addNewQuestion: "Neue Frage hinzufügen",
      addNewQuestionA11yHint: 'Navigiere zu "Neue Frage hinzufügen"',
      listItemA11yHint: "Zu Frage Bearbeiten navigieren.",
      title: "Titel*",
      titleInputA11yLabel: "Titel der Frage. Eingabe erfordert.",
      placeHolderExample: "Beispiel: {{ example }}",
      longQuestion: "Vollständige Frage",
      longQuestionInputA11yLabel: "Vollständiger Fragetext. Optional.",
      save: "Änderungen speichern",
      saveA11yHint: "Änderungen speichern und zur Fragenliste zurücknavigieren",
      archive: "Frage archivieren",
      archiveA11yHint:
        "Bestätigungsdialogfeld zum Archivieren der Frage öffnen",
      type: "Antworttyp: {{type}}",
      typepoints: "Punkte",
      typefulltext: "Volltext",
      typeSelectMenuBackOverlayA11yLabel: "Antworttyp-Auswahlmenü schließen",
      typeSelectMenuButtonA11yHint: "Antworttyp-Auswahlmenü öffnen",
      confirmArchival: "Archivierung bestätigen",
      archivalDialogDescription:
        "Möchtest du diese Frage wirklich archivieren? Unbestätigter Fortschritt in den heutigen Dailies wird zurückgesetzt.",
      archivalDialogConfirmA11yHint:
        "Frage archivieren und zur Fragenliste zurücknavigieren",
      create: "Erstellen",
      createButtonA11yHint:
        "Frage erstellen und zurücknavigieren zur Fragenliste.",
    },
    defaultQuestions: {
      Goals: "Ziele",
      Progress: "Fortschritt",
      Meaning: "Bedeutung",
      Happiness: "Glückseligkeit",
      Social: "Beziehungen",
      Engagement: "Engagement",
      Highlight: "Höhepunkt",
      questionLongGoals:
        "Habe ich mein Bestes gegeben, um mir klare Ziele zu setzen?",
      questionLongProgress:
        "Habe ich mein Bestes gegeben, um Fortschritt entgegen meiner Ziele zu machen?",
      questionLongMeaning:
        "Habe ich mein Bestes gegeben, um Bedeutung zu finden, in dem was ich tue?",
      questionLongHappiness:
        "Habe ich mein Bestes gegeben, um glücklich zu sein?",
      questionLongSocial:
        "Habe ich mein Bestes gegeben. um positive soziale Beziehungen aufzubauen?",
      questionLongEngagement:
        "Habe ich mein Bestes gegeben, um engagiert zu sein?",
      questionLongHighlight:
        "Was war mein persönlicher Höhepunkt des Tages und warum?",
    },
    history: {
      questionNotFound: "Nicht gefunden",
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
      history: "履歴",
      historicEntry: "履歴エントリ",
    },
    general: {
      navigateBackAllyHint: "前のスクリーンに戻る",
      confirm: "確認",
      cancel: "キャンセル",
      openDrawerA11yLabel: "ナビゲーションドロワーを開く",
      ok: "OK",
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
    statistics: {
      clearHistory: "危険: 履歴をクリア",
      ["last7days"]: "過去 7 日間",
      ["last30days"]: "過去 30 日間",
      ["last1year"]: "過去 1 年間",
      lifetime: "有効期間",
      insufficientDataInTimeSpan:
        "選択した期間内には {{numOfEntries}} 回Dailiesを完了しています。Dailiesを2回完了した後にはの統計情報が表示されます。",
      mockHistory: "危険: 履歴をテストデータで置き換える",
      timeSpanSelectMenuA11yLabel: "期間選択メニューを閉まる",
    },
    settings: {
      showAppbar: "アプリバーをDailiesで表紙する",
      darkMode: "ダークモード",
      language: "言語: {{language}}",
      uniteConfirmAndShare:
        "Dailiesのまとめ画面に確認と共有を一つのボトンにする",
      startOfNextDay: "次の日の開始時間: {{time}}",
      enableDevMode: "開発モード",
      devModeDialogTitle: "開発モードを有効にする？",
      devModeDialogDescription:
        "開発モードを有効にすると、アプリが壊れやすくなります。データは壊れる場合もあります。本当に開発モードを有効しますか？",
      exportHistory: "履歴と質問をエクスポート",
      importHistory: "履歴と質問をインポート",
      importHistoryDialogTitle: "インポートの確認",
      importHistoryDialogDescription:
        "警告! この操作は現在の履歴と質問を上書きします。本当にクリップボードからの履歴をインポートしますか?",
      importHistoryErrorDialogTitle: "インポートエラー",
      importHistoryErrorDialogDescription:
        "クリップボードからの履歴と質問をインポートできませんでした。コピーした履歴ストリングが有効であることを確認してください。現在の履歴や質問は変更されていませんでした。",
      importHistorySuccessMessage: "インポートは成功しました。",
      notificationTitle: "Dailiesの時間ですよ。",
      notificationTime: "毎日{{time}}に通知を行います。",
      notificationsEnabled: "毎日の通知が有効",
    },
    dailies: {
      next: "次へ",
      nextA11yHint: "次の質問またはまとめ画面に移動します",
      shortAnswerListA11yLabel: "点で答えた質問の答え一覧：{{ answers }}",
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
      confirmResetDialogConfirmButtonA11yHint:
        "今日のDailiesをリセットして最初の質問に移動する",
      noQuestions:
        "質問は存在しません。自己開発の旅をスタートするため質問を追加してください。",
      noQuestionsButton: "質問を追加する",
      goto: '"{{questionTitle}}"質問に移動する',
      answerRowA11yLabel: "{{ questionTitle }}：{{ answer }}",
      pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
      pointsQuestionInputA11yHint:
        "答えは１点から１０点までを入力してください。１０点を入れるために０を入力してください。入力後アプリは次の答えていない質問またはまとめ画面に移動します。",
    },
    questions: {
      addNewQuestion: "新しい質問を追加する",
      addNewQuestionA11yHint: "「新しい質問を追加する」に移動する",
      listItemA11yHint: "質問を編集するためにタップしてください。",
      title: "タイトル*",
      titleInputA11yLabel: "質問のタイトル。入力が必要。",
      placeHolderExample: "例文：{{ example }}",
      longQuestion: "質問の全体",
      longQuestionInputA11yLabel: "質問の全体。オプション。",
      save: "変更を保存する",
      saveA11yHint: "変更を保存して質問一覧に戻る",
      archive: "質問をアーカイブする",
      archiveA11yHint: "質問をアーカイブの確認ダイアログ ボックスを開く",
      type: "答えのタイプ: {{type}}",
      typepoints: "ポイント",
      typefulltext: "全文",
      typeSelectMenuBackOverlayA11yLabel: "答えのタイプのß選択メンユーをしまる",
      typeSelectMenuButtonA11yHint: "答えのタイプのß選択メンユーを開く",
      confirmArchival: "アーカイブの確認",
      archivalDialogDescription:
        "本当にこの質問をアーカイブしますか?未確認のk今日のDailiesはリセットされます。",
      archivalDialogConfirmA11yHint: "質問をアーカイブして質問一覧に戻る",
      create: "質問を作成する",
      createButtonA11yHint: "質問を作成して質問一覧に戻る",
    },
    defaultQuestions: {
      Goals: "目標",
      Progress: "上達",
      Meaning: "意味",
      Happiness: "幸せ",
      Social: "人間関係",
      Engagement: "頑張り",
      Highlight: "ハイライト",
      questionLongGoals: "具体的な目標を立つためにできるだけ頑張りましたか？",
      questionLongProgress: "目標に上達ためにできるだけ頑張りましたか？",
      questionLongMeaning: "活躍に意味を感じるためにできるだけ頑張りましたか？",
      questionLongHappiness: "幸せでいるためにできるだけ頑張りましたか？",
      questionLongSocial:
        "良好な人間関係を築くためにできるだけ頑張りましたか？",
      questionLongEngagement: "頑張るためにできるだけ頑張りましたか？",
      questionLongHighlight: "今日の圧巻は何でしたか？なぜそれが圧巻でしたか？",
    },
    history: {
      questionNotFound: "見つかりません",
    },
  },
};

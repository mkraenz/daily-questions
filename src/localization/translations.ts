const en = {
  routes: {
    dailies: "Daily Questions",
    statistics: "Statistics",
    customizeQuestions: "Customize Questions",
    settings: "Settings",
    addNewQuestion: "Add New Question",
    editQuestion: "Edit Question",
    history: "History",
    historicEntry: "Historic Entry",
    about: "About",
    licenseList: "Licenses",
    licenseInfo: "License Details",
  },
  general: {
    navigateBackAllyHint: "Navigate back to previous screen",
    appbarHeaderAllyLabel: "{{ title }} screen",
    confirm: "Confirm",
    cancel: "Cancel",
    cancelDialogA11yHint:
      "Closes the dialog and returns to the previous screen",
    openDrawerA11yLabel: "Open drawer navigation menu on the left",
    drawerLabelA11yHint: "Navigates to {{ title }}",
    ok: "OK",
    on: "on",
    off: "off",
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
      "You completed your daily questions {{numOfEntries}} times in the selected time span. Your statistics show up once you've completed them at least 2 times.",
    mockHistory: "DANGER: replace history by test data",
    timeSpanSelectMenuA11yLabel: "Closes time span selection menu",
    timeSpanSelectButtonA11yLabel:
      "Currently selected time span of statistic charts: {{ timeSpan }}",
    timeSpanSelectButtonA11yHint: "Opens time span selection menu",
  },
  settings: {
    sectionGeneral: "General",
    sectionCustomization: "Customization",
    sectionAdvanced: "Advanced",
    sectionAccessibility: "Accessibility",
    showAppbar: "Show app bar under Daily Questions",
    showAppbarA11yHint:
      "This setting is always enabled when using a screen reader.",
    darkMode: "Dark mode",
    darkModeA11yHint: "Activates or deactiviates dark mode",
    language: "Language",
    languageA11yLabel: "Selected language",
    languageA11yHint: "Opens the language selection menu",
    highContrast: "High contrast",
    highContrastDescription: "High contrast colors (only light mode)",
    highContrastA11yLabel: "High contrast colors (only light mode)",
    highContrastA11yHint: "Activates or deactiviates high contrast",
    autoNavigate: "Automatic navigation",
    autoNavigateDescription:
      "Automatically go to next question on answer input. Disable to show Next button.",
    autoNavigateA11yLabel:
      "Automatic navigation. Automatically goes to next question on answer input under Daily Questions. Disabling this will show a Next button for all questions. Disabling is suggested for screenreader users",
    autoNavigateA11yHint: "Enables or disables automatic navigation",
    autofocus: "Autofocus",
    autofocusDescription: "Automatically focus input fields",
    autofocusA11yLabel: "Autofocus. Automatically focus input fields",
    autofocusA11yHint: "Enables or disables automatic focus",
    uniteConfirmAndShare: "Unite Confirm and Share buttons",
    uniteConfirmAndShareDescription:
      "Unites the Confirm and Share buttons in the summary screen",
    uniteConfirmAndShareA11yHint:
      "Unites the separated buttons for confirming and for sharing in your answer summary into a single button for both simultaneously, or deactivates this behavior.",
    showPointsQuestionInputPlaceHolder: "How-to-answer placeholder",
    showPointsQuestionInputPlaceHolderDescription:
      "Show How-to-answer in input fields under Daily Questions",
    showPointsQuestionInputPlaceHolderA11yHint:
      "This setting is always disabled when using a screen reader.",
    startOfNextDay: "Start of next day",
    startOfNextDayA11yHint:
      "Opens the time selection dialog for setting the start of the next day. If you happen to forget answering your daily questions on one day, you can still answer them on the next day until this time. The answers will count towards your previous day.",
    enableDevMode: "Development mode",
    enableDevModeA11yLabel: "Enable development mode",
    enableDevModeA11yHint:
      "Opens a confirmation dialog to enable the development mode. If the development mode is already enabled, it will instead be immediately deactivated.",
    devModeDialogTitle: "Enable Development Mode?",
    devModeDialogDescription:
      "This will enable experimental features. This may result in permanent (!) damage to your app data. Do you really want to enable development mode?",
    exportHistory: "Export questions & history",
    exportHistoryHint: "Open a share dialog for exporting",
    importHistory: "Import questions & history",
    importHistoryHint:
      "Opens a dialog to confirm importing history and questions from clipboard",
    importHistoryDialogTitle: "Confirm Import",
    importHistoryDialogDescription:
      "Warning! This will permanently overwrite your current history and questions. Do you really want to import history and questions from clipboard?",
    importHistoryErrorDialogTitle: "Import Failed",
    importHistoryErrorDialogDescription:
      "Importing history and questions from clipboard failed. Please make sure your copied history string is valid. Your existing history and questions were NOT changed.",
    importHistorySuccessMessage: "Import successful",
    notificationTitle: "It's time for your Daily Questions.",
    notificationTime: "Daily reminder time",
    notificationTimeA11yHint:
      "Opens the time selection dialog for setting your daily reminder notification time.",
    notificationsEnabled: "Daily reminder",
    notificationsEnabledDescription: "Enables reminder notifications",
    notificationsEnabledA11yLabel: "Enable daily reminder notifications",
    notificationsEnabledA11yHint:
      "Activates or deactivates daily reminder notifications for answering your daily questions. You can set the notification time in the subsequent settings item",
  },
  about: {
    companyWebsiteA11yLabel: "Copyright © 2022 Kraenz Software Development",
    companyWebsiteA11yHint:
      "Opens website of Kraenz Software Development in the web browser",
    githubDescription:
      "MIT Open-Source Software. Collaborators and translators wanted. Check our ",
    githubLinkText: "GitHub repository.",
    githubA11yLabel:
      "MIT Open-Source Software. Collaborators and translators wanted. Check our Github repository.",
    githubA11yHint: "Opens GitHub repository website in the web browser",
    gotoLicenseList: "Go to licenses",
    gotoLicenseListA11yHint: "", // intentionally left blank
    licenseInfoLicense: "Licensed under: {{ license }}",
    licenseInfoAuthor: "Author: {{ author }}",
    licenseInfoVersion: "Installed version: {{ version }}",
    licenseInfoLink: "Link: {{ link }}",
    licenseItemTitle: "{{ name }} v{{ version}}",
    licenseItemDescription: "{{ author }}, licensed under {{ license }}",
    licenseItemAccessibilityHint: "Go to details",
    privacyPolicy: "Privacy Policy",
    privacyPolicyA11yHint: "Opens the privacy policy in the web browser",
  },
  dailies: {
    next: "Next",
    nextA11yHint: "Navigate to next question or to summary",
    shortAnswerListA11yLabel:
      "Provided answers to questions with points: {{ answers }}",
    confirmDailiesA11yHint:
      "Confirms today's answers and adds them to the history.",
    shareA11yHint:
      "Opens dialog to share with another app for today's answers with a formatted summary",
    share: "Share",
    confirmAndShare: "Confirm and Share",
    confirmAndShareA11yHint:
      "Confirms today's answers and adds them to the history. Then, Opens dialog to share with another app for today's answers with a formatted summary",
    confirmedSuccessfully: "Answers added to history",
    confirmedSuccessfullySnackbarDismissActionA11yHint:
      "Closes the success toast notification. This occurs automatically after a few seconds.",
    ok: "OK",
    summaryHeader: "Your answers from {{today}}",
    resetButtonAllyLabel: "Reset today's answers",
    resetButtonAllyHint: "Opens a dialog to confirm resetting today's answers",
    confirmResetDialogMessage:
      "Do you really want to reset today's answers? Your history will be preserved.",
    resetDialogHeader: "Reset Answers",
    confirmResetDialogConfirmButtonA11yHint:
      "Resets today's answers and navigates to the first question",
    noQuestions:
      "No questions available. Please add at least one question to start your self-improvement journey.",
    noQuestionsButton: "Add New Question",
    goto: 'Go back to question "{{questionTitle}}"',
    answerRowA11yLabel: "{{ questionTitle }}: {{ answer }}",
    pointsQuestionPlaceholder:
      "Insert answer from 1 to 10 points. Tap 0 for 10 points.",
    pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
    pointsQuestionInputWithAutoNavigateA11yHint:
      "Enter your answer from 1 to 10 points, enter 0 for 10 points. After input, the app automatically navigates to next question or to summary.",
    pointsQuestionInputWithoutAutoNavigateA11yHint:
      "Enter your answer from 1 to 10 points, enter 0 for 10 points.",
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
      "Do you really want to archive this question? Unconfirmed progress of today's answers will be reset.",
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
    listItemA11yLabel: "Answers of {{ date }}: {{ answers }}",
    listItemA11yHint: "Go to details view of {{ date }}",
    questionNotFound: "Not found",
    emptyHistoryDescription:
      "Nothing here yet. Once you've finished answering the daily questions for the first time, your history will show here.",
    emptyHistoryButton: "Go to Daily Questions",
    emptyHistoryButtonA11yHint: "Navigates to Daily Questions screen",
    search: "Search",
    showSearchA11yLabel:
      "Display or hide input field for searching your history",
    clearSearchA11yLabel: "Clear the current search input",
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
  | TranslationKey<"about">
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
      dailies: "Tägliche Fragen",
      statistics: "Statistiken",
      customizeQuestions: "Fragen bearbeiten",
      settings: "Einstellungen",
      addNewQuestion: "Neue Frage hinzufügen",
      editQuestion: "Frage bearbeiten",
      history: "Verlauf",
      historicEntry: "Verlaufseintrag",
      about: "Über",
      licenseList: "Lizenzen",
      licenseInfo: "Lizenzdetails",
    },
    general: {
      navigateBackAllyHint: "Zurück zur vorherigen Ansicht",
      appbarHeaderAllyLabel: "{{ title }}-Ansicht",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
      cancelDialogA11yHint:
        "Schließt das Dialogfeld und kehrt zur vorherigen Ansicht zurück",
      openDrawerA11yLabel: "Navigationsleiste auf der linken Seite öffnen",
      drawerLabelA11yHint: "Navigiert zur {{ title }}-Ansicht",
      ok: "OK",
      on: "an",
      off: "aus",
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
        "Du hast deine Täglichen Fragen {{numOfEntries}} mal im ausgewählten Zeitraum abgeschlossen. Deine Statistiken werden hier angezeigt, sobald du sie mindestens 2 mal abgeschlossen hast.",
      mockHistory: "GEFAHR: Verlauf durch Testdaten ersetzen",
      timeSpanSelectMenuA11yLabel: "Zeitraumauswahlmenü schließen",
      timeSpanSelectButtonA11yLabel:
        "Ausgewählter Zeitraum für Statistiken: {{ timeSpan }}",
      timeSpanSelectButtonA11yHint: "Zeitraumauswahlmenü öffnen",
    },
    settings: {
      sectionGeneral: "Allgemein",
      sectionCustomization: "Anpassung",
      sectionAdvanced: "Erweiterte Einstellung",
      sectionAccessibility: "Bedienungshilfen",
      showAppbar: "App-Leiste anzeigen in Tägliche Fragen",
      showAppbarA11yHint:
        "Diese Einstellung ist immer aktiviert, wenn die Bildschirmsprachausgabe genutzt wird.",
      darkMode: "Nachtmodus",
      darkModeA11yHint: "Aktiviert oder deaktiviert den Nachtmodus",
      highContrast: "Hoher Kontrast",
      highContrastDescription: "Hoher Kontrast für Farben (nur heller Modus).",
      highContrastA11yLabel: "Hoher Kontrast im hellen Modus",
      highContrastA11yHint: "Aktiviert oder deaktiviert hohen Kontrast",
      autoNavigate: "Automatische Navigation",
      autoNavigateDescription:
        "Navigiert automatisch zur nächsten Frage bei Antworteingabe. Deaktiviere für Weiter-Knopf.",
      autoNavigateA11yLabel:
        "Automatische Navigation. Navigiert automatisch zur nächsten Frage bei Antworteingabe in den Täglichen Fragen. Bei Deaktivierung wird ein Weiter-Knopf für alle Fragen angezeigt. Die Deaktivierung ist empfohlen für Benutzer der Bildschirmausgabe.",
      autoNavigateA11yHint:
        "Aktiviert oder deaktiviert automatische Navigation.",
      autofocus: "Autofokus",
      autofocusDescription: "Automatisch den Fokus in Eingabefelder setzen",
      autofocusA11yLabel:
        "Autofokus. Automatisch den Fokus in Eingabefelder setzen",
      autofocusA11yHint: "Aktiviert oder deaktiviert automatischen Fokus",
      language: "Sprache",
      languageA11yLabel: "Ausgewählte Sprache",
      languageA11yHint: "Öffnet das Sprachauswahlmenü",
      uniteConfirmAndShare: "Bestätigen und Teilen vereinen",
      uniteConfirmAndShareDescription:
        "Vereint Knöpfe für Bestätigen und Teilen in Zusammenfassung der Täglichen Fragen",
      uniteConfirmAndShareA11yHint:
        "Vereinigt die separaten Schaltflächen für Bestätigen und für Teilen in der Antwort-Zusammenfassungsansicht zu einer einzigen Schaltfläche, bzw. deaktiviert dieses Verhalten.",
      showPointsQuestionInputPlaceHolder: "Antworthinweis in Eingabefeldern",
      showPointsQuestionInputPlaceHolderDescription:
        "Zeigt Hinweise zur Bedienung in Antworteingabefeldern",
      showPointsQuestionInputPlaceHolderA11yHint:
        "Diese Einstellung ist immer deaktiviert, wenn die Bildschirmsprachausgabe genutzt wird.",
      startOfNextDay: "Beginn des nächsten Tages",
      startOfNextDayA11yHint:
        "Öffnet das Zeit-Auswahl-Dialogfeld zum Setzen des Beginn des nächsten Tages. Solltest du an einem Tag vergessen deine täglichen Fragen zu beantworten, kannst du bis zu dieser Zeit die Antworten des Vortags nachholen.",
      enableDevMode: "Entwicklermodus",
      enableDevModeA11yLabel: "Entwicklermodus aktivieren",
      enableDevModeA11yHint:
        "Öffnet ein Dialogfeld zum Bestätigen der Aktivierung des Entwicklermodus. Falls der Entwicklermodus bereits aktiviert ist, wird dieser bei Anklicken der Schaltfläche sofort deaktiviert",
      devModeDialogTitle: "Entwicklermodus aktivieren?",
      devModeDialogDescription:
        "Der Entwicklermodus aktiviert experimentelle Funktionen. Dies kann deine App und darin enthaltene Daten dauerhaft (!) kaputt machen. Bist du dir sicher, dass du den Entwicklermodus aktivieren möchtest?",
      exportHistory: "Verlauf & Fragen exportieren",
      exportHistoryHint:
        "Öffnet ein Dialogfeld zum Teilen mit anderer App für das Exportieren",
      importHistory: "Verlauf & Fragen importieren",
      importHistoryHint:
        "Öffnet ein Dialogfeld zum Bestätigen des Imports von Verlauf und Fragen von der Zwischenablage",
      importHistoryDialogTitle: "Import bestätigen",
      importHistoryDialogDescription:
        "Achtung! Diese Aktion überschreibt deinen aktuellen Verlauf und deine Fragen dauerhaft. Möchtest du wirklich mit dem Import eines neuen Verlaufs von der Zwischenablage fortfahren?",
      importHistoryErrorDialogTitle: "Import fehlgeschlagen",
      importHistoryErrorDialogDescription:
        "Der Verlauf und die Fragen in deiner Zwischenablage konnte nicht importiert werden. Bitte stelle sicher, dass der kopierte Verlaufsstring gültig ist. Dein aktueller Verlauf und deine Fragen wurde NICHT geändert.",
      importHistorySuccessMessage: "Import erfolgreich",
      notificationTitle: "Zeit für deine Täglichen Fragen.",
      notificationTime: "Erinnerungszeit",
      notificationTimeA11yHint:
        "Öffnet das Zeit-Auswahl-Dialogfeld zum Setzen der täglichen Benachrichtigungszeit",
      notificationsEnabled: "Erinnerungen",
      notificationsEnabledDescription: "Aktiviert Benachrichtigungen",
      notificationsEnabledA11yLabel: "Erinnerungen aktivieren",
      notificationsEnabledA11yHint:
        "Aktiviert oder deaktiviert tägliche Erinnerungsbenachrichtigungen an die Beantwortung der täglichen Fragen. Die Benachrichtigungszeit kann in der nachfolgenden Einstellung geändert werden.",
    },
    about: {
      companyWebsiteA11yLabel: "Copyright © 2022 Kraenz Software Development",
      companyWebsiteA11yHint:
        "Öffnet die Website von Kraenz Software Development im Webbrowser",
      githubDescription:
        "MIT Open-Source Software. Mitwirkende und Übersetzer gesucht (Englisch notwendig). Hier findest du unser ",
      githubLinkText: "Github Repository.",
      githubA11yLabel:
        "MIT Open-Source Software. Mitwirkende und Übersetzer gesucht (Englisch notwendig). Hier findest du unser GitHub Repository",
      githubA11yHint: "Öffnet GitHub Repository Website im Webbrowser",
      gotoLicenseList: "Zu den Lizenzen",
      gotoLicenseListA11yHint: "Navigiere zu den Lizenzen",
      licenseInfoLicense: "Lizensiert unter: {{ license }}",
      licenseInfoAuthor: "Autor: {{ author }}",
      licenseInfoVersion: "Installierte Version: {{ version }}",
      licenseInfoLink: "Link: {{ link }}",
      licenseItemTitle: "{{ name }} v{{ version}}",
      licenseItemDescription: "{{ author }}, lizensiert unter {{ license }}",
      licenseItemAccessibilityHint: "Navigiere zu Details",
      privacyPolicy: "Datenschutzrichtlinien",
      privacyPolicyA11yHint:
        "Öffnet die Datenschutzrichtlinien im Webbrowser. Dokument nur auf Englisch verfügbar.",
    },
    dailies: {
      next: "Weiter",
      nextA11yHint: "Zur nächsten Frage oder Zusammenfassung navigieren",
      shortAnswerListA11yLabel:
        "Gegebene Antworten zu Punktefragen: {{ answers }}",
      confirmDailiesA11yHint:
        "Bestätigt die heutigen Antworten und fügt einen Eintrag zum Verlauf hinzu",
      shareA11yHint:
        "Öffnet ein Dialogfeld zum Teilen mit anderer App für die heutigen Antworten mit einer formatierten Zusammenfassung",
      share: "Teilen",
      confirmAndShare: "Bestätigen und Teilen",
      confirmAndShareA11yHint:
        "Bestätigt die heutigen Antworten und fügt einen Eintrag zum Verlauf hinzu. Außerdem öffnet es ein Dialogfeld zum Teilen mit anderer App für die heutigen Antworten mit einer formatierten Zusammenfassung",
      confirmedSuccessfully: "Antworten zum Verlauf hinzugefügt",
      confirmedSuccessfullySnackbarDismissActionA11yHint:
        "Schließt die Erfolgs-Popup-Benachrichtigung. Dies geschieht automatisch nach einigen Sekunden.",
      ok: "OK",
      summaryHeader: "Deine Antworten vom {{today}}",
      resetButtonAllyLabel: "Heutige Antworten zurücksetzen",
      resetButtonAllyHint:
        "Öffnet einen Dialog zum Bestätigen des Zurücksetzens der heutigen Antworten",
      confirmResetDialogMessage:
        "Möchtest du wirklich deine heutigen Antworten zurücksetzen? Dein Verlauf wird beibehalten.",
      resetDialogHeader: "Antworten zurücksetzen",
      confirmResetDialogConfirmButtonA11yHint:
        "Setzt deine heutigen Antworten zurück und navigiert zur ersten Frage",
      noQuestions:
        "Keine Fragen verfügbar. Bitte füge mindestens eine Frage hinzu um deine Reise zu persönlicher Weiterentwicklung zu starten.",
      noQuestionsButton: "Neue Frage hinzufügen",
      goto: 'Zurücknavigieren zur Frage „{{ questionTitle }}"',
      answerRowA11yLabel: "{{ questionTitle }}: {{ answer }}",
      pointsQuestionPlaceholder:
        "Antwort von 1 bis 10 Punkten eingeben. Tippe 0 für 10 Punkte.",
      pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
      pointsQuestionInputWithAutoNavigateA11yHint:
        "Antwort von 1 bis 10 Punkten eingeben. Für 10 Punkte Null-Taste drücken. Nach der Eingabe, navigiert die App zur nächsten unbeantworteten Frage oder zur Zusammenfassung.",
      pointsQuestionInputWithoutAutoNavigateA11yHint:
        "Antwort von 1 bis 10 Punkten eingeben. Für 10 Punkte Null-Taste drücken.",
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
        "Möchtest du diese Frage wirklich archivieren? Unbestätigter Fortschritt in den heutigen Antworten unter Tägliche Fragen wird zurückgesetzt.",
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
      listItemA11yLabel: "Deine Antworten vom {{ date }} waren {{ answers }}",
      listItemA11yHint: "Navigiere zur Detailansicht vom {{ date }}",
      questionNotFound: "Nicht gefunden",
      emptyHistoryDescription:
        "Es wurden keine Verlaufseinträge gefunden. Nachdem du deine Täglichen Fragen zum ersten Mal beantwortet hast, wird dein Verlauf hier angezeigt.",
      emptyHistoryButton: "Zu den Täglichen Fragen",
      emptyHistoryButtonA11yHint: 'Navigiert zur Ansicht "Tägliche Fragen"',
      search: "Suche",
      showSearchA11yLabel:
        "Eingabefeld für Suchen im Verlauf anzeigen oder ausblenden",
      clearSearchA11yLabel: "Aktuelle Sucheingabe löschen",
    },
  },
  ja: {
    routes: {
      dailies: "毎日の質問",
      statistics: "系統情報",
      customizeQuestions: "質問をカスタマイズ",
      settings: "設定",
      addNewQuestion: "新しい質問を追加",
      editQuestion: "質問を編集",
      history: "履歴",
      historicEntry: "履歴エントリ",
      about: "詳細情報",
      licenseList: "ライセンス",
      licenseInfo: "ライセンスの詳細",
    },
    general: {
      navigateBackAllyHint: "前のスクリーンに戻る",
      appbarHeaderAllyLabel: "{{ title }}画面",
      confirm: "確認",
      cancel: "キャンセル",
      cancelDialogA11yHint: "ダイアログ・ボックスを閉めて前の画面に戻る",
      openDrawerA11yLabel: "ナビゲーションドロワーを左側に開く",
      drawerLabelA11yHint: "{{ title }}画面に移動する",
      ok: "OK",
      on: "ON",
      off: "OFF",
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
        "選択した期間内には {{numOfEntries}} 回「毎日の質問」答えました。2回答えた後にはの統計情報が表示されます。",
      mockHistory: "危険: 履歴をテストデータで置き換える",
      timeSpanSelectMenuA11yLabel: "期間選択メニューを閉まる",
      timeSpanSelectButtonA11yLabel: "選択された系統期間: {{ timeSpan }}",
      timeSpanSelectButtonA11yHint: "期間選択メニューを開く",
    },
    settings: {
      sectionGeneral: "全般設定",
      sectionCustomization: "カスタマイズ",
      sectionAdvanced: "詳細設定",
      sectionAccessibility: "ユーザー補助",
      showAppbar: "アプリバーを毎日の質問で表示する",
      showAppbarA11yHint: "この設定はスクリーンリーダーを使うときに常に有効",
      darkMode: "ダークモード",
      darkModeA11yHint: "ダークモードを有効化または無効化する",
      highContrast: "ハイ コントラスト",
      highContrastDescription: "ハイ コントラストの色 (ライト モードのみ)",
      highContrastA11yLabel: "ハイ コントラストの色 (ライト モードのみ)",
      highContrastA11yHint: "ハイ コントラストの色を有効化または無効化する",
      autoNavigate: "自動的なナビゲーション",
      autoNavigateDescription:
        "答えの入力のとき自動的に次の質問に移動。無効の場合は「次」ボトンを表示。",
      autoNavigateA11yLabel:
        "自動的なナビゲーション。毎日の質問画面では答えの入力のときに自動的に次の質問に移動する。無効にすると「次」ボトンを表示する。無効化はスクリーンリーダーにおすすめです。",
      autoNavigateA11yHint: "自動的なナビゲーションを有効化または無効化する",
      autofocus: "自動的にフォーカス",
      autofocusDescription: "自動的にフォーカスを入力フィールドに当てる。",
      autofocusA11yLabel:
        "自動的にフォーカス。自動的にフォーカスを入力フィールドに当てる。",
      autofocusA11yHint: "自動的にフォーカスを有効化または無効化する",
      language: "言語",
      languageA11yLabel: "選択した言語",
      languageA11yHint: "言語選択メニューを開く",
      uniteConfirmAndShare: "確認と共有ボトンを合同",
      uniteConfirmAndShareDescription:
        "答えのまとめ画面に確認と共有を一つのボトンにする",
      uniteConfirmAndShareA11yHint:
        "答えまとめ画面に２つのボトンに分かれている確認ボトンと共有ボトンを一つにする。またはその機能をオフにする",
      showPointsQuestionInputPlaceHolder: "使い方の説明を表示する",
      showPointsQuestionInputPlaceHolderDescription:
        "毎日の質問画面に答え入力フィールドに使い方の説明を表示する",
      showPointsQuestionInputPlaceHolderA11yHint:
        "この設定はスクリーンリーダーを使うときに常に無効",
      startOfNextDay: "次の日の開始時間",
      startOfNextDayA11yHint:
        "時間選択のダイアログボックスを開く。毎日の質問をし忘れた場合、次の日のこの時間までに答えたら前の日の答えになります。",
      enableDevMode: "開発モード",
      enableDevModeA11yLabel: "開発モードを有効化または無効化する",
      enableDevModeA11yHint:
        "開発モードを有効化するための確認ダイアログボックスを表紙する。開発モードは有効している場合、直接に開発モードを無効化する",
      devModeDialogTitle: "開発モードを有効にする？",
      devModeDialogDescription:
        "開発モードを有効にすると、アプリが壊れやすくなります。データは壊れる場合もあります。本当に開発モードを有効しますか？",
      exportHistory: "履歴と質問をエクスポート",
      exportHistoryHint:
        "履歴と質問をエクスポートするための共有ダイアログ・ボックスを開く",
      importHistory: "履歴と質問をインポート",
      importHistoryHint:
        "歴史と質問をクリップボードからインポートするための確認ダイアログボックスを開く",
      importHistoryDialogTitle: "インポートの確認",
      importHistoryDialogDescription:
        "警告! この操作は現在の履歴と質問を上書きします。本当にクリップボードからの履歴をインポートしますか?",
      importHistoryErrorDialogTitle: "インポートエラー",
      importHistoryErrorDialogDescription:
        "クリップボードからの履歴と質問をインポートできませんでした。コピーした履歴ストリングが有効であることを確認してください。現在の履歴や質問は変更されていませんでした。",
      importHistorySuccessMessage: "インポートは成功しました。",
      notificationTitle: "毎日の質問の時間ですよ。",
      notificationTime: "毎日のリマインダー通知時間",
      notificationTimeA11yHint:
        "毎日のリマインダー通知時間の時間選択のダイアログボックスを開く",
      notificationsEnabled: "毎日のリマインダー通知",
      notificationsEnabledDescription:
        "リマインダー通知を有効化または無効化する",
      notificationsEnabledA11yLabel:
        "毎日のリマインダー通知を有効化または無効化する",
      notificationsEnabledA11yHint:
        "毎日のリマインダー通知時間は次の設定で設定できます",
    },
    about: {
      companyWebsiteA11yLabel: "Copyright © 2022 Kraenz Software Development",
      companyWebsiteA11yHint:
        "Kraenz Software DevelopmentのWeb サイトを Web ブラウザーで開く",
      githubDescription:
        "MIT Open-Source Software.コラボレーターや翻訳者募集中（英語必然）。プロジェクトはこちら：",
      githubLinkText: "Githubリポジトリ",
      githubA11yLabel:
        "MIT Open-Source Software.コラボレーターや翻訳者募集中（英語必然）。プロジェクトのGithubリポジトリはこちら。",
      githubA11yHint: "GitHubリポジトリのWeb サイトを Web ブラウザーで開く",
      gotoLicenseList: "ライセンス一覧へ移動する",
      gotoLicenseListA11yHint: "", // intentionally left blank
      licenseInfoLicense: "ライセンス：　{{ license }}",
      licenseInfoAuthor: "作成者：　{{ author }}",
      licenseInfoVersion: "インストールされているバージョン：　{{ version }}",
      licenseInfoLink: "リンク：　{{ link }}",
      licenseItemTitle: "{{ name }} v{{ version}}",
      licenseItemDescription:
        "{{ author }}、{{ license }}によりライセンスされています",
      licenseItemAccessibilityHint: "詳細に移動する",
      privacyPolicy: "プライバシー・ポリシー（英語のみ）",
      privacyPolicyA11yHint:
        "プライバシー・ポリシー（英語のみ）を Web ブラウザーで開く。",
    },
    dailies: {
      next: "次へ",
      nextA11yHint: "次の質問またはまとめ画面に移動する",
      shortAnswerListA11yLabel: "点で答えた質問の答え一覧：{{ answers }}",
      confirmDailiesA11yHint: "今日の答えを確認して歴史に追加する",
      share: "共有",
      shareA11yHint:
        "他のアプリと共有するためのダイアログ・ボックスを開く。共有される文章は今日の答えのまとめ。",
      confirmAndShare: "確認して共有する",
      confirmAndShareA11yHint:
        "今日の答えを確認して歴史に追加する。その後他のアプリと共有するためのダイアログ・ボックスを開く。共有される文章は今日の答えのまとめ。",
      confirmedSuccessfully: "答えを履歴に追加しました",
      confirmedSuccessfullySnackbarDismissActionA11yHint:
        "成功のトースト通知を閉まる。数秒してから自動的にトースト通知が閉まる",
      ok: "OK",
      summaryHeader: "{{today}}の答え",
      resetButtonAllyLabel: "今日の答えをリセットする",
      resetButtonAllyHint:
        "ダイアログ・ボックスを開いて今日の答えのリセットを確認してください",
      confirmResetDialogMessage:
        "本当に今日の答えをリセットしますか?履歴は保存されます。",
      resetDialogHeader: "答えをリセットする",
      confirmResetDialogConfirmButtonA11yHint:
        "今日の答えをリセットして最初の質問に移動する",
      noQuestions:
        "質問はありません。自己開発の旅をスタートするため質問を追加してください。",
      noQuestionsButton: "質問を追加する",
      goto: '"{{questionTitle}}"質問に移動する',
      answerRowA11yLabel: "{{ questionTitle }}：{{ answer }}",
      pointsQuestionPlaceholder: "答えは１〜１０点。０タップ＝１０点",
      pointsQuestionInputA11yLabel: "{{ questionTitle }}, {{ questionLong }}",
      pointsQuestionInputWithAutoNavigateA11yHint:
        "答えは１点から１０点までを入力してください。１０点を入れるために０を入力してください。入力後アプリは次の答えていない質問またはまとめ画面に移動します。",
      pointsQuestionInputWithoutAutoNavigateA11yHint:
        "答えは１点から１０点までを入力してください。１０点を入れるために０を入力してください。",
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
      archiveA11yHint: "質問をアーカイブの確認ダイアログ・ボックスを開く",
      type: "答えのタイプ: {{type}}",
      typepoints: "ポイント",
      typefulltext: "全文",
      typeSelectMenuBackOverlayA11yLabel: "答えのタイプのß選択メンユーをしまる",
      typeSelectMenuButtonA11yHint: "答えのタイプのß選択メンユーを開く",
      confirmArchival: "アーカイブの確認",
      archivalDialogDescription:
        "本当にこの質問をアーカイブしますか?未確認の今日の答えはリセットされます。",
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
      listItemA11yLabel: "{{ date }}の答えは{{ answers }}",
      listItemA11yHint: "{{ date }}に詳細画面に移動する",
      questionNotFound: "見つかりません",
      emptyHistoryDescription:
        "表示するアイテムがありません。最初の応えをし終わってから歴史は表示します。",
      emptyHistoryButton: "毎日の質問に戻る",
      emptyHistoryButtonA11yHint: "毎日の質問画面を開く",
      search: "検索",
      showSearchA11yLabel: "検索入力フィールドを表示または非表示する",
      clearSearchA11yLabel: "検索条件をクリアする",
    },
  },
};

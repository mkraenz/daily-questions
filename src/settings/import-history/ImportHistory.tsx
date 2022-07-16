import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setHistory } from "../../history/history.slice";
import { useTranslation } from "../../localization/useTranslations";
import { setQuestions } from "../../questions/questions.slice";
import { RootState } from "../../store";
import { ExportedHistoryAndQuestions } from "./ExportHistory";
import { validateImportedHistoryString } from "./import-history-validation";
import { validateImportedQuestionsString } from "./import-questions-validation";
import ImportHistoryConfirmationDialog from "./ImportHistoryConfirmationDialog";
import ImportHistoryErrorDialog from "./ImportHistoryErrorDialog";
import ImportHistorySuccessMessage from "./ImportHistorySuccessMessage";

const mapState = (state: RootState) => ({
  history: state.history.history,
});
const mapDispatch = {
  setHistory,
  setQuestions,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

const ImportHistory: FC<PropsFromRedux> = ({ setHistory, setQuestions }) => {
  const [confirmationShown, showConfirmation] = useState(false);
  const [errored, setErrored] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const pastedText = await Clipboard.getStringAsync();
    const historyValid = validateImportedHistoryString(pastedText);
    const questionsValid = validateImportedQuestionsString(pastedText);
    if (historyValid && questionsValid) {
      const imported: ExportedHistoryAndQuestions = JSON.parse(pastedText);
      // save to parse because of validation
      setHistory({ history: imported.history });
      setQuestions({ questions: imported.questions });
      setSuccess(true);
    } else {
      setErrored(true);
    }
    showConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <ImportHistorySuccessMessage
        onDismiss={() => setSuccess(false)}
        visible={success}
      />
      <ImportHistoryErrorDialog
        visible={errored}
        onDismiss={() => setErrored(false)}
      />
      <ImportHistoryConfirmationDialog
        visible={confirmationShown}
        onCancel={() => showConfirmation(false)}
        onConfirm={handleConfirm}
      />
      <Button
        onPress={() => showConfirmation(true)}
        mode="outlined"
        compact={false}
      >
        {t("settings:importHistory")}
      </Button>
    </View>
  );
};

export default connector(ImportHistory);

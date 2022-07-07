import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setHistory } from "../history/history.slice";
import { RootState } from "../store";
import { validateImportedHistoryString } from "./import-validation";
import ImportHistoryConfirmationDialog from "./ImportHistoryConfirmationDialog";
import ImportHistorySuccessMessage from "./ImportHistorySuccessMessage";

const mapState = (state: RootState) => ({
  history: state.history.history,
});
const mapDispatch = {
  setHistory,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

const ImportHistory: FC<PropsFromRedux> = ({ setHistory }) => {
  const [confirmationShown, showConfirmation] = useState(false);
  const [errored, setErrored] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();

  const handleConfirm = async () => {
    const pastedText = await Clipboard.getStringAsync();
    const valid = validateImportedHistoryString(pastedText);
    if (valid) {
      setHistory({
        // save to parse because of validation
        history: JSON.parse(pastedText),
      });
      setSuccess(true);
    } else {
      console.log("invalid");
      setErrored(true);
      // TODO error handling
    }
    showConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <ImportHistorySuccessMessage
        onDismiss={() => setSuccess(false)}
        visible={success}
      />
      <ImportHistoryConfirmationDialog
        visible={confirmationShown}
        onCancel={() => showConfirmation(false)}
        onConfirm={handleConfirm}
      />
      <Button onPress={() => showConfirmation(true)} mode="outlined">
        Import History from Clipboard
      </Button>
    </View>
  );
};

export default connector(ImportHistory);

import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { setHistory } from "../history/history.slice";
import { RootState } from "../store";
import { validateImportedHistoryString } from "./import-validation";

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
  const [errored, setErrored] = useState(false);

  const handlePress = async () => {
    const pastedText = await Clipboard.getStringAsync();
    const valid = validateImportedHistoryString(pastedText);
    if (valid) {
      setHistory({
        // save to parse because of validation
        history: JSON.parse(pastedText),
      });
    } else {
      console.log("invalid");
      setErrored(true);
      // TODO error handling
    }
  };

  return (
    <View style={styles.container}>
      {/* DIALOG for import (to avoid accidentally pressing the button ) */}
      <Button onPress={handlePress} mode="outlined">
        Import History from Clipboard
      </Button>
    </View>
  );
};

export default connector(ImportHistory);

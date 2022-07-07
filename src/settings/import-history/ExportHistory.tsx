import React, { FC } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";

const mapState = (state: RootState) => ({
  history: state.history.history,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

const ExportHistory: FC<PropsFromRedux> = ({ history }) => {
  const handlePress = async () => {
    await Share.share({
      message: JSON.stringify(history),
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handlePress} mode="outlined">
        Export History
      </Button>
    </View>
  );
};

export default connector(ExportHistory);

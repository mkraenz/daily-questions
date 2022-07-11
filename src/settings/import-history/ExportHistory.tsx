import React, { FC } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../../localization/useTranslations";
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
  const { t } = useTranslation();
  const handlePress = async () => {
    await Share.share({
      message: JSON.stringify(history),
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={handlePress} mode="outlined">
        {t("settings:exportHistory")}
      </Button>
    </View>
  );
};

export default connector(ExportHistory);

import React, { FC } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { History } from "../../history/history.slice";
import { useTranslation } from "../../localization/useTranslations";
import { selectQuestions } from "../../questions/questions.selectors";
import { Question } from "../../questions/questions.slice";
import { RootState } from "../../store";

const mapState = (state: RootState) => ({
  questions: selectQuestions(state),
  history: state.history.history,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export interface ExportedHistoryAndQuestions {
  questions: Question[];
  history: History;
}

const ExportHistory: FC<PropsFromRedux> = ({ history, questions }) => {
  const { t } = useTranslation();
  const handlePress = async () => {
    await Share.share({
      message: JSON.stringify({ questions, history }),
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

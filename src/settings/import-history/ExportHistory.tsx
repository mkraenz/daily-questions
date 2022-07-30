import React, { FC } from "react";
import { Share, StyleSheet } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { History } from "../../history/history.slice";
import { useTranslation } from "../../localization/useTranslations";
import { selectQuestions } from "../../questions/questions.selectors";
import { Question } from "../../questions/questions.slice";
import { RootState } from "../../store";
import SettingsButtonRow from "../SettingsButtonRow";

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
    <SettingsButtonRow
      title={t("settings:exportHistory")}
      accessibilityLabel={t("settings:exportHistory")}
      accessibilityHint={t("settings:exportHistoryHint")}
      onPress={handlePress}
    />
  );
};

export default connector(ExportHistory);

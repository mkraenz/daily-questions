import React, { FC } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { showPointQuestionsInputPlaceholderInDailies } from "./settings.slice";

const mapState = (state: RootState) => ({
  checked: state.settings.pointQuestionsInputPlaceholderShownInDailies,
});
const mapDispatch = { showPointQuestionsInputPlaceholderInDailies };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ShowPointsQuestionInputPlaceholderSwitch: FC<PropsFromRedux> = ({
  checked,
  showPointQuestionsInputPlaceholderInDailies,
}) => {
  const { t } = useTranslation();
  return (
    <Checkbox.Item
      label={t("settings:showPointsQuestionInputPlaceHolder")}
      status={checked ? "checked" : "unchecked"}
      onPress={() => showPointQuestionsInputPlaceholderInDailies(!checked)}
    ></Checkbox.Item>
  );
};

export default connector(ShowPointsQuestionInputPlaceholderSwitch);

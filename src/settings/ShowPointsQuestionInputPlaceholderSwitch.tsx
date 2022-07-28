import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { showPointQuestionsInputPlaceholderInDailies } from "./settings.slice";
import SettingsSwitchRow from "./SettingsSwitchRow";

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
    <SettingsSwitchRow
      title={t("settings:showPointsQuestionInputPlaceHolder")}
      description={t("settings:showPointsQuestionInputPlaceHolderDescription")}
      value={checked}
      onPress={() => showPointQuestionsInputPlaceholderInDailies(!checked)}
      accessibilityLabel={t(
        "settings:showPointsQuestionInputPlaceHolderDescription"
      )}
      accessibilityHint={t(
        "settings:showPointsQuestionInputPlaceHolderA11yHint"
      )}
    />
  );
};

export default connector(ShowPointsQuestionInputPlaceholderSwitch);

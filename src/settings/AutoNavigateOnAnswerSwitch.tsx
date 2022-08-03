import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { toggleDisableAutoNavigationOnAnswer } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  enabled: !state.accessibility.disableAutoNavigationOnAnswer,
});
const mapDispatch = { toggleDisableAutoNavigationOnAnswer };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AutoNavigateOnAnswerSwitch: FC<PropsFromRedux> = ({
  enabled,
  toggleDisableAutoNavigationOnAnswer,
}) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:autoNavigate")}
      description={t("settings:autoNavigateDescription")}
      accessibilityLabel={t("settings:autoNavigateA11yLabel")}
      accessibilityHint={t("settings:autoNavigateA11yHint")}
      onPress={toggleDisableAutoNavigationOnAnswer}
      value={enabled}
    />
  );
};

export default connector(AutoNavigateOnAnswerSwitch);

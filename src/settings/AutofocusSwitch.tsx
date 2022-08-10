import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { toggleAutofocusDisabled } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  enabled: !state.accessibility.autofocusDisabled,
});
const mapDispatch = { toggleAutofocusDisabled };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AutofocusSwitch: FC<PropsFromRedux> = ({
  enabled,
  toggleAutofocusDisabled,
}) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:autofocus")}
      description={t("settings:autofocusDescription")}
      accessibilityLabel={t("settings:autofocusA11yLabel")}
      accessibilityHint={t("settings:autofocusA11yHint")}
      onPress={toggleAutofocusDisabled}
      value={enabled}
    />
  );
};

export default connector(AutofocusSwitch);

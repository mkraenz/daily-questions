import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { toggleHighContrast } from "../accessibility/accessibility.slice";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  enabled: state.accessibility.highContrast,
});
const mapDispatch = { toggleHighContrast };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const HighContrastModeSwitch: FC<PropsFromRedux> = ({
  enabled,
  toggleHighContrast,
}) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:highContrast")}
      description={t("settings:highContrastDescription")}
      accessibilityLabel={t("settings:highContrastA11yLabel")}
      accessibilityHint={t("settings:highContrastA11yHint")}
      onPress={toggleHighContrast}
      value={enabled}
    />
  );
};

export default connector(HighContrastModeSwitch);

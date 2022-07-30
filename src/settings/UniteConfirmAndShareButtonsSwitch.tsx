import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { setUniteConfirmAndShareButtonsInDailies } from "./settings.slice";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  checked: state.settings.uniteConfirmAndShareButtonsInDailies,
});
const mapDispatch = { setUniteConfirmAndShareButtonsInDailies };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const UniteConfirmAndShareButtonsSwitch: FC<PropsFromRedux> = ({
  checked,
  setUniteConfirmAndShareButtonsInDailies,
}) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:uniteConfirmAndShare")}
      value={checked}
      description={t("settings:uniteConfirmAndShareDescription")}
      accessibilityLabel={t("settings:uniteConfirmAndShare")}
      accessibilityHint={t("settings:uniteConfirmAndShareA11yHint")}
      onPress={() => setUniteConfirmAndShareButtonsInDailies(!checked)}
    />
  );
};

export default connector(UniteConfirmAndShareButtonsSwitch);

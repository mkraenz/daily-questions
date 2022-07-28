import React, { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import {
  DEFAULT_NOTIFICATION_HOUR,
  DEFAULT_NOTIFICATION_MINUTE,
} from "../LocalNotifications";
import { RootState } from "../store";
import { setNotificationTime } from "./settings.slice";
import SettingsSwitchRow from "./SettingsSwitchRow";

const mapState = (state: RootState) => ({
  notificationSettings: state.settings.notifications,
});
const mapDispatch = { setNotificationTime };
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const NotificationSwitch: FC<PropsFromRedux> = ({
  notificationSettings,
  setNotificationTime,
}) => {
  const { t } = useTranslation();
  return (
    <SettingsSwitchRow
      title={t("settings:notificationsEnabled")}
      description={t("settings:notificationsEnabledDescription")}
      accessibilityLabel={t("settings:notificationsEnabledA11yLabel")}
      accessibilityHint={t("settings:notificationsEnabledA11yHint")}
      value={!!notificationSettings?.enabled}
      onPress={() =>
        setNotificationTime({
          enabled: !notificationSettings?.enabled,
          hour: notificationSettings?.hour || DEFAULT_NOTIFICATION_HOUR,
          minute: notificationSettings?.minute || DEFAULT_NOTIFICATION_MINUTE,
        })
      }
    />
  );
};

export default connector(NotificationSwitch);

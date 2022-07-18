import React, { FC } from "react";
import { Checkbox } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "../localization/useTranslations";
import {
  DEFAULT_NOTIFICATION_HOUR,
  DEFAULT_NOTIFICATION_MINUTE,
} from "../LocalNotifications";
import { RootState } from "../store";
import { setNotificationTime } from "./settings.slice";

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
    <Checkbox.Item
      label={t("settings:notificationsEnabled")}
      status={notificationSettings?.enabled ? "checked" : "unchecked"}
      onPress={() =>
        setNotificationTime({
          enabled: !notificationSettings?.enabled,
          hour: notificationSettings?.hour || DEFAULT_NOTIFICATION_HOUR,
          minute: notificationSettings?.minute || DEFAULT_NOTIFICATION_MINUTE,
        })
      }
    ></Checkbox.Item>
  );
};

export default connector(NotificationSwitch);

import * as Notifications from "expo-notifications";
import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  TranslateFunction,
  useTranslation,
} from "./localization/useTranslations";
import {
  NotificationSettings,
  setNotificationTime,
} from "./settings/settings.slice";
import { RootState } from "./store";

const mapState = (state: RootState) => ({
  settings: state.settings.notifications,
});
const mapDispatch = {
  setNotificationTime,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const DEFAULT_NOTIFICATION_MINUTE = 0;
export const DEFAULT_NOTIFICATION_HOUR = 21;
const CATEGORY = "dailyReminder";

async function scheduleNotifications(
  t: TranslateFunction,
  settings?: NotificationSettings
) {
  // IOS: need to ask for permissions https://docs.expo.dev/versions/latest/sdk/notifications/#ios-1
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t("settings:notificationTitle"),
      categoryIdentifier: CATEGORY,
    },
    trigger: {
      repeats: true,
      minute: settings?.minute ?? DEFAULT_NOTIFICATION_MINUTE,
      hour: settings?.hour ?? DEFAULT_NOTIFICATION_HOUR,
    },
  });
}

const LocalNotifications: FC<PropsFromRedux> = ({
  settings,
  setNotificationTime,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    const setupNotificationsOnFirstAppOpen = async () => {
      const isFirstAppOpen = !settings;
      if (isFirstAppOpen) {
        await scheduleNotifications(t, settings);
        setNotificationTime({
          enabled: true,
          hour: DEFAULT_NOTIFICATION_HOUR,
          minute: DEFAULT_NOTIFICATION_MINUTE,
        });
      }
    };

    setupNotificationsOnFirstAppOpen();

    // ensures that the notification is shown if the app is in foreground. Not having this behavior probably confuses the user.
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, [settings]);

  useEffect(() => {
    const rescheduleNotifications = async () => {
      if (settings?.enabled) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await scheduleNotifications(t, settings);
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    };
    rescheduleNotifications();
  }, [settings]);

  return null;
};

export default connector(LocalNotifications);

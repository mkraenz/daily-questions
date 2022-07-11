import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import BaseAppBar from "./BaseAppBar";
import DailiesAppBar from "./dailies/DailiesAppBar";
import DailiesNav from "./dailies/DailiesNav";
import { useTranslation } from "./localization/useTranslations";
import QuestionsNav from "./questions/QuestionsNav";
import SettingsScreen from "./settings/SettingsScreen";
import StatisticsScreen from "./statistics/StatisticsScreen";
import { RootState } from "./store";

const mapState = (state: RootState) => ({
  appbarShownInDailies: state.settings.appbarShownInDailies,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Drawer = createDrawerNavigator();

const NavigationApp: FC<PropsFromRedux> = ({ appbarShownInDailies }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const initialRoute = "Dailies";

  return (
    <NavigationContainer
      theme={{
        colors: {
          card: theme.colors.background,
          background: theme.colors.background,
          primary: theme.colors.primary,
          border: theme.colors.background,
          notification: theme.colors.primary,
          text: theme.colors.text,
        },
        dark: theme.dark,
      }}
    >
      {/* for some reason, translucent status bar is not automatically enabled on android which caused a too large appbar to be rendered */}
      <StatusBar translucent />
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          header: BaseAppBar,
        }}
      >
        <Drawer.Screen
          name="Dailies"
          component={DailiesNav}
          options={{
            headerShown: appbarShownInDailies,
            header: (props) => <DailiesAppBar {...props} />,
            title: t("routes:dailies"),
          }}
        />
        <Drawer.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            title: t("routes:statistics"),
          }}
        />
        <Drawer.Screen
          name="Customize Questions"
          component={QuestionsNav}
          options={{
            headerShown: false,
            title: t("routes:customizeQuestions"),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t("routes:settings"),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default connector(NavigationApp);

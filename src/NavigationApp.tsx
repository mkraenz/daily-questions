import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import BaseAppBar from "./BaseAppBar";
import DailiesAppBar from "./dailies/DailiesAppBar";
import DailiesNav from "./dailies/DailiesNav";
import HistoryNav from "./history/HistoryNav";
import { useTranslation } from "./localization/useTranslations";
import { GlobalDrawerParamList, Routes } from "./nav";
import QuestionsNav from "./questions/QuestionsNav";
import SettingsScreen from "./settings/SettingsScreen";
import StatisticsScreen from "./statistics/StatisticsScreen";
import { RootState } from "./store";

const mapState = (state: RootState) => ({
  appbarShownInDailies: state.settings.appbarShownInDailies,
  devMode: state.settings.devMode,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Drawer = createDrawerNavigator<GlobalDrawerParamList>();

const NavigationApp: FC<PropsFromRedux> = ({
  appbarShownInDailies,
  devMode,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const initialRoute: Routes = "Dailies";

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
          // Workaround: using a render function to avoid 'Error: Rendered more hooks than during the previous render.' when using useTranslation() in the BaseAppBar component
          header: (props) => <BaseAppBar {...props} />,
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
          name="HistoryNav"
          component={HistoryNav}
          options={{
            headerShown: false,
            title: t("routes:history"),
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

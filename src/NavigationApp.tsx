import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import BaseAppBar from "./BaseAppBar";
import DailiesNav from "./dailies/DailiesNav";
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
      <Drawer.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          header: BaseAppBar,
        }}
      >
        <Drawer.Screen
          name="Dailies"
          component={DailiesNav}
          options={{ headerShown: appbarShownInDailies }}
        />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen
          name="Customize Questions"
          component={QuestionsNav}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default connector(NavigationApp);

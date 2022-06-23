import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import DailiesNav from "./dailies/DailiesNav";
import QuestionsNav from "./questions/QuestionsNav";
import SettingsScreen from "./settings/SettingsScreen";
import StatisticsScreen from "./statistics/StatisticsScreen";

const Drawer = createDrawerNavigator();

const NavigationApp: FC = () => {
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
          header: () => null, // disable nav top bar
          sceneContainerStyle: { paddingTop: StatusBar.currentHeight }, // respect status bar
        }}
      >
        <Drawer.Screen name="Dailies" component={DailiesNav} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen name="Customize Questions" component={QuestionsNav} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;

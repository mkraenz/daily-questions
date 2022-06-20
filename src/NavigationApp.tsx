import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import CustomNavQuestionsApp from "./QuestionsNavApp";
import SettingsScreen from "./screens/SettingsScreen";
import StatisticsScreen from "./screens/StatisticsScreen";

const Drawer = createDrawerNavigator();

const NavigationApp: FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          card: theme.dark ? theme.colors.backdrop : theme.colors.background,
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
        initialRouteName="Dailies"
        screenOptions={{
          header: () => null, // disable nav top bar
          sceneContainerStyle: { paddingTop: StatusBar.currentHeight }, // respect status bar
        }}
      >
        <Drawer.Screen name="Dailies" component={CustomNavQuestionsApp} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;

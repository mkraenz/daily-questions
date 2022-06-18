import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import CustomNavigationApp from "./QuestionsNavApp";
import About from "./screens/AboutScreen";
import StatisticsScreen from "./screens/StatisticsScreen";

const Drawer = createDrawerNavigator();

const NavigationApp: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: () => null, // disable top bar
        }}
      >
        <Drawer.Screen name="Dailies" component={CustomNavigationApp} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;

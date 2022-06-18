import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CustomNavigationApp from "./QuestionsNavApp";

const About = ({}: {}) => {
  return (
    <View>
      <Text>About This App</Text>
      <Text>v1.1.0</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const NavigationApp: FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dailies" component={CustomNavigationApp} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;

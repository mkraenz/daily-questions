import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { List, useTheme } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import AboutNav from "./about/AboutNav";
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

const CustomDrawer: FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <DrawerContentScrollView {...props}>
      {Object.values(props.descriptors).map((route) => {
        const title = route.options.title ?? route.route.name;
        const DrawerIcon = route.options.drawerIcon
          ? route.options.drawerIcon
          : () => null;
        return (
          <List.Item
            key={route.route.key}
            onPress={() => {
              route.navigation.navigate(route.route.name);
              route.navigation.closeDrawer();
            }}
            title={title}
            style={{ padding: 0 }}
            titleStyle={{
              fontSize: 18,
              color: route.navigation.isFocused()
                ? theme.colors.primary
                : theme.colors.text,
            }}
            left={() => (
              // @ts-expect-error
              <DrawerIcon
                color={
                  route.navigation.isFocused()
                    ? theme.colors.primary
                    : theme.colors.text
                }
              />
            )}
            accessibilityLabel={title}
            accessibilityHint={t("general:drawerLabelA11yHint", {
              title,
            })}
            // using role button over link. @see https://stackoverflow.com/questions/73119202/when-to-use-accessibilityrole-link-in-reactnative
            accessibilityRole="button"
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const NavigationApp: FC<PropsFromRedux> = ({
  appbarShownInDailies,
  devMode,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const initialRoute: Routes = "Customize Questions";

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
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Dailies"
          component={DailiesNav}
          options={{
            headerShown: appbarShownInDailies,
            header: (props) => <DailiesAppBar {...props} />,
            title: t("routes:dailies"),
            drawerIcon: (props) => (
              <List.Icon icon="chat-question" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            title: t("routes:statistics"),
            drawerIcon: (props) => <List.Icon icon="chart-line" {...props} />,
          }}
        />
        <Drawer.Screen
          name="HistoryNav"
          component={HistoryNav}
          options={{
            headerShown: false,
            title: t("routes:history"),
            drawerIcon: (props) => <List.Icon icon="history" {...props} />,
          }}
        />
        <Drawer.Screen
          name="Customize Questions"
          component={QuestionsNav}
          options={{
            headerShown: false,
            title: t("routes:customizeQuestions"),
            drawerIcon: (props) => <List.Icon icon="pencil" {...props} />,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t("routes:settings"),
            drawerIcon: (props) => <List.Icon icon="cog" {...props} />,
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNav}
          options={{
            title: t("routes:about"),
            headerShown: false,
            drawerIcon: (props) => (
              <List.Icon icon="information-outline" {...props} style={{}} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default connector(NavigationApp);

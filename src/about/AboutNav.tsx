import { DrawerHeaderProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BackAppBar from "../BackAppBar";
import BaseAppBar from "../BaseAppBar";
import { useTranslation } from "../localization/useTranslations";
import { AboutStackParamList } from "./about-nav";
import AboutScreen from "./AboutScreen";
import LicenseInfoScreen from "./LicenseInfoScreen";
import LicensesListScreen from "./LicensesListScreen";

const Stack = createStackNavigator<AboutStackParamList>();

/**
 * WARNING: We assume the StackNav is nested inside a DrawerNav
 */
const AboutNav = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About screen"
        component={AboutScreen}
        options={{
          // WARNING: We assume the StackNav is nested inside a DrawerNav
          header: (props) => (
            <BaseAppBar {...(props as unknown as DrawerHeaderProps)} />
          ),
          title: t("routes:about"),
        }}
      />
      <Stack.Screen
        name="LicenseList"
        component={LicensesListScreen}
        options={{ header: BackAppBar, title: t("routes:licenseList") }}
      />
      <Stack.Screen
        name="LicenseInfo"
        // TODO wait for https://github.com/react-navigation/react-navigation/issues/10802 to be resolved
        component={LicenseInfoScreen as unknown as React.ComponentType}
        options={{ header: BackAppBar, title: t("routes:licenseInfo") }}
      />
    </Stack.Navigator>
  );
};

export default AboutNav;

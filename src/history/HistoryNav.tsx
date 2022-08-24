import { DrawerHeaderProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BackAppBar from "../BackAppBar";
import { useTranslation } from "../localization/useTranslations";
import HistoricEntryScreen from "./HistoricEntryScreen";
import { HistoryStackParamList } from "./history-nav";
import HistoryAppBar from "./HistoryAppBar";
import HistoryScreen from "./HistoryScreen";

const Stack = createStackNavigator<HistoryStackParamList>();

/**
 * WARNING: We assume the StackNav is nested inside a DrawerNav
 */
const HistoryNav = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          // WARNING: We assume the StackNav is nested inside a DrawerNav
          header: (props) => (
            <HistoryAppBar {...(props as unknown as DrawerHeaderProps)} />
          ),
          title: t("routes:history"),
        }}
      />
      <Stack.Screen
        name="HistoricEntry"
        component={HistoricEntryScreen}
        options={{ header: BackAppBar, title: t("routes:historicEntry") }}
      />
    </Stack.Navigator>
  );
};

export default HistoryNav;

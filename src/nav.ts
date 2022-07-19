import { DrawerNavigationProp } from "@react-navigation/drawer";

export type GlobalDrawerParamList = {
  Dailies: undefined;
  Statistics: undefined;
  ["Customize Questions"]: undefined;
  Settings: undefined;
  HistoryNav: undefined;
};

export type Routes = keyof GlobalDrawerParamList;

export type GlobalDrawerNavigationProp =
  DrawerNavigationProp<GlobalDrawerParamList>;

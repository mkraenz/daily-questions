import type { StackNavigationProp } from "@react-navigation/stack";

export interface LibraryInfo {
  name: string;
  licenseType: string;
  link: string;
  installedVersion: string;
  author: string;
}

export type AboutStackParamList = {
  ["About screen"]: undefined;
  ["LicenseList"]: undefined;
  ["LicenseInfo"]: LibraryInfo;
};

export type AboutNavigationProp = StackNavigationProp<AboutStackParamList>;

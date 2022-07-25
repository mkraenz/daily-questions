import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { FlatList } from "react-native";
import { Divider, List } from "react-native-paper";
import licenses from "../generated/prod-licenses.json";
import type { AboutNavigationProp, LibraryInfo } from "./about-nav";

interface Props {}

const LicensesListScreen: FC<Props> = (props) => {
  return (
    <FlatList
      data={licenses}
      renderItem={(item) => <LicenseItem {...item.item} />}
      ItemSeparatorComponent={Divider}
      keyExtractor={(item) => item.name}
    />
  );
};

const LicenseItem: FC<LibraryInfo> = (props) => {
  const nav = useNavigation<AboutNavigationProp>();
  const { name, licenseType, installedVersion, author } = props;
  return (
    <List.Item
      title={`${name} v${installedVersion}`}
      description={`${author}, licensed under ${licenseType}`}
      onPress={() => nav.navigate("LicenseInfo", { ...props })}
    />
  );
};

export default LicensesListScreen;

import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const {
    name,
    licenseType: license,
    installedVersion: version,
    author,
  } = props;
  const title = t("about:licenseItemTitle", { name, version });
  const description = t("about:licenseItemDescription", { author, license });
  return (
    <List.Item
      title={title}
      description={description}
      onPress={() => nav.navigate("LicenseInfo", { ...props })}
      accessibilityLabel={`${title}, ${description}`}
      accessibilityHint={t("about:licenseItemAccessibilityHint")}
      accessibilityRole="button"
    />
  );
};

export default LicensesListScreen;

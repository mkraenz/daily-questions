import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";
import { AboutNavigationProp } from "./about-nav";
import GithubNote from "./GithubNote";
import VersionAndCopyright from "./VersionAndCopyright";

const GoToLicensesButton = () => {
  const nav = useNavigation<AboutNavigationProp>();
  const { t } = useTranslation();

  return (
    <Button onPress={() => nav.navigate("LicenseList")}>
      {t("about:gotoLicenseList")}
    </Button>
  );
};

const AboutScreen: FC = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <VersionAndCopyright />
      <GithubNote />
      <GoToLicensesButton />
    </View>
  );
};

export default AboutScreen;

import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";
import { AboutNavigationProp } from "./about-nav";
import GithubNote from "./GithubNote";
import VersionAndCopyright from "./VersionAndCopyright";

const styles = StyleSheet.create({ mgBottom: { marginBottom: 12 } });

const GoToLicensesButton = () => {
  const nav = useNavigation<AboutNavigationProp>();
  const { t } = useTranslation();

  return (
    <Button
      onPress={() => nav.navigate("LicenseList")}
      style={styles.mgBottom}
      accessibilityLabel={t("about:gotoLicenseList")}
      accessibilityHint={t("about:gotoLicenseListA11yHint")}
    >
      {t("about:gotoLicenseList")}
    </Button>
  );
};

const PrivacyPolicyButton = () => {
  const { t } = useTranslation();

  return (
    <Button
      onPress={() =>
        Linking.openURL(
          "https://daily-questions.s3.eu-central-1.amazonaws.com/privacy-policy.html"
        )
      }
      accessibilityLabel={t("about:privacyPolicy")}
      accessibilityHint={t("about:privacyPolicyA11yHint")}
      style={styles.mgBottom}
    >
      {t("about:privacyPolicy")}
    </Button>
  );
};

const AboutScreen: FC = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <VersionAndCopyright />
      <GithubNote />
      <GoToLicensesButton />
      <PrivacyPolicyButton />
    </View>
  );
};

export default AboutScreen;

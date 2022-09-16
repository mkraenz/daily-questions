import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Paragraph, TouchableRipple, useTheme } from "react-native-paper";
import { useTranslation } from "../localization/useTranslations";

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
  },
  container: {
    marginVertical: 24,
  },
});

const VersionAndCopyright = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const openCompanyWebsite = () => {
    Linking.openURL("http://kraenz.eu");
  };
  const nbsp = "\u00a0";
  return (
    <View style={styles.container}>
      <Paragraph>Daily Questions v1.26.0</Paragraph>
      <TouchableRipple
        onPress={openCompanyWebsite}
        accessibilityRole="link"
        accessibilityLabel={t("about:companyWebsiteA11yLabel")}
        accessibilityHint={t("about:companyWebsiteA11yHint")}
      >
        <Paragraph>
          Copyright © 2022{" "}
          <Paragraph style={[styles.link, { color: theme.colors.accent }]}>
            Kraenz{nbsp}Software{nbsp}Development
          </Paragraph>
        </Paragraph>
      </TouchableRipple>
    </View>
  );
};

export default VersionAndCopyright;

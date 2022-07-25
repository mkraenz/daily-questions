import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Paragraph, TouchableRipple, useTheme } from "react-native-paper";

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
  const openCompanyWebsite = () => {
    Linking.openURL("http://kraenz.eu");
  };
  const nbsp = "\u00a0";
  return (
    <View style={styles.container}>
      <Paragraph>Daily Questions v1.17.0</Paragraph>
      <TouchableRipple onPress={openCompanyWebsite}>
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

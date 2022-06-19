import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Paragraph } from "react-native-paper";
import { lightTheme } from "../theme";

const styles = StyleSheet.create({
  link: {
    color: lightTheme.colors.accent,
    textDecorationLine: "underline",
  },
});

const VersionAndCopyright = () => {
  const openCompanyWebsite = () => {
    Linking.openURL("http://kraenz.eu");
  };
  const nbsp = "\u00a0";
  return (
    <View>
      <Paragraph>v1.3.0</Paragraph>
      <Paragraph>
        Copyright © 2022{" "}
        <Paragraph onPress={openCompanyWebsite} style={styles.link}>
          Kraenz{nbsp}Software{nbsp}Development
        </Paragraph>
      </Paragraph>
    </View>
  );
};

export default VersionAndCopyright;

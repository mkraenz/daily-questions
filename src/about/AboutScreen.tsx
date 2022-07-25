import React, { FC } from "react";
import { View } from "react-native";
import VersionAndCopyright from "./VersionAndCopyright";

const AboutScreen: FC = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <VersionAndCopyright />
      {/* // TODO does this need changes to privacy policy? */}
      {/* <GithubNote /> */}
    </View>
  );
};

export default AboutScreen;

import React, { FC } from "react";
import { View } from "react-native";
import { Paragraph } from "react-native-paper";
// import licenses from "../generated/prod-licenses.json";
import VersionAndCopyright from "./VersionAndCopyright";

const AboutScreen: FC = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <VersionAndCopyright />
      {/* // TODO does this need changes to privacy policy? */}
      {/* <GithubNote /> */}
      {/* {licenses.map((l) => (
        <Paragraph key={l.name}>
          {l.name} {l.licenseType}
        </Paragraph>
      ))} */}
    </View>
  );
};

export default AboutScreen;

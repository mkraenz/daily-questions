import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface Props {
  navigation: { goBack: () => void };
  route: { name: string };
}

const BackAppBar: FC<Props> = (props) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      <Appbar.Content title={props.route.name} />
    </Appbar.Header>
  );
};

export default BackAppBar;

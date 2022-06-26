import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";

const BaseAppBar: FC<DrawerHeaderProps> = (props) => {
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
      />
      <Appbar.Content title={props.route.name} />
    </Appbar.Header>
  );
};

export default BaseAppBar;

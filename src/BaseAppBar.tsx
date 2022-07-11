import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "./localization/useTranslations";

const BaseAppBar: FC<DrawerHeaderProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
        accessibilityLabel={t("general:openDrawerA11yLabel")}
      />
      <Appbar.Content title={props.options.title ?? props.route.name} />
      {props.children}
    </Appbar.Header>
  );
};

export default BaseAppBar;

import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC, PropsWithChildren } from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "./localization/useTranslations";

const BaseAppBar: FC<DrawerHeaderProps & PropsWithChildren> = (props) => {
  const { t } = useTranslation();
  const title = props.options.title ?? props.route.name;
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
        accessibilityRole="button"
        accessibilityLabel={t("general:openDrawerA11yLabel")}
      />
      <Appbar.Content
        title={title}
        accessibilityRole="header"
        accessibilityLabel={t("general:appbarHeaderAllyLabel", { title })}
      />
      {props.children}
    </Appbar.Header>
  );
};

export default BaseAppBar;

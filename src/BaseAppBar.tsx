import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import { getAccessibilityHiddenProps } from "./accessibility/getAccessibilityHiddenProps";
import { useTranslation } from "./localization/useTranslations";
import { RootState } from "./store";

const mapState = (state: RootState) => ({
  dialogOpen: state.accessibility.dialogOpen,
});
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const BaseAppBar: FC<DrawerHeaderProps & PropsFromRedux> = (props) => {
  const { t } = useTranslation();
  const title = props.options.title ?? props.route.name;
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
        accessibilityRole="button"
        accessibilityLabel={t("general:openDrawerA11yLabel")}
        {...getAccessibilityHiddenProps(props.dialogOpen)}
      />
      <Appbar.Content
        title={title}
        accessibilityRole="header"
        accessibilityLabel={t("general:appbarHeaderAllyLabel", { title })}
        {...getAccessibilityHiddenProps(props.dialogOpen)}
      />
      {props.children}
    </Appbar.Header>
  );
};

export default connector(BaseAppBar);

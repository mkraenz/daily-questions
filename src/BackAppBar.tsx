import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { useTranslation } from "./localization/useTranslations";

interface Props {
  navigation: { goBack: () => void };
  route: { name: string };
  options: {
    title?: string;
  };
}

const BackAppBar: FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => props.navigation.goBack()}
        accessibilityHint={t("general:navigateBackAllyHint")}
      />
      <Appbar.Content title={props.options.title ?? props.route.name} />
    </Appbar.Header>
  );
};

export default BackAppBar;

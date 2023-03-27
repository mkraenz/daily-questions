import { DrawerHeaderProps } from "@react-navigation/drawer";
import React, { FC, useState } from "react";
import { Appbar, Searchbar } from "react-native-paper";
import { connect, ConnectedProps } from "react-redux";
import BaseAppBar from "../BaseAppBar";
import { useTranslation } from "../localization/useTranslations";
import { RootState } from "../store";
import { setSearchQuery } from "./unpersisted-history.slice";

const mapState = (state: RootState) => ({
  searchQuery: state.unpersistedHistory.searchQuery,
  autofocus: !state.accessibility.autofocusDisabled,
});
const mapDispatch = {
  setSearchQuery,
};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const HistoryAppbar: FC<DrawerHeaderProps & PropsFromRedux> = (props) => {
  const { t } = useTranslation();
  const [searchShown, showSearch] = useState(false);
  const toggleSearch = () => showSearch(!searchShown);
  const hideSearch = () => {
    setSearchQuery({ searchQuery: "" });
    toggleSearch();
  };

  const { searchQuery, setSearchQuery, autofocus } = props;
  const onChangeSearch = (query: string) =>
    setSearchQuery({ searchQuery: query });

  return (
    <BaseAppBar {...props}>
      {!searchShown && (
        <Appbar.Action
          icon="magnify"
          onPress={toggleSearch}
          accessibilityRole="button"
          accessibilityLabel={t("history:showSearchA11yLabel")}
          // accessibilityHint is covered within the accessibilityLabel because
          // Searchbar does not expose a searchAccessibilityHint prop
        />
      )}
      {searchShown && (
        <Searchbar
          autoFocus={autofocus}
          clearButtonMode="always"
          placeholder={t("history:search")}
          searchAccessibilityLabel={t("history:showSearchA11yLabel")}
          accessibilityRole="search"
          accessibilityValue={{ text: searchQuery }}
          clearAccessibilityLabel={t("history:clearSearchA11yLabel")}
          // TODO can we improve this somehow for responsiveness?
          style={{ maxWidth: "80%" }}
          onIconPress={hideSearch}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      )}
    </BaseAppBar>
  );
};

export default connector(HistoryAppbar);

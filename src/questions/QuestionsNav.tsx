import { DrawerHeaderProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BackAppBar from "../BackAppBar";
import BaseAppBar from "../BaseAppBar";
import { useTranslation } from "../localization/useTranslations";
import AddNewQuestionScreen from "./AddNewQuestionScreen";
import EditQuestionScreen from "./EditQuestionScreen";
import { QuestionsStackParamList } from "./questions-nav";
import QuestionsListScreen from "./QuestionsListScreen";

const Stack = createStackNavigator<QuestionsStackParamList>();

/**
 * WARNING: We assume the StackNav is nested inside a DrawerNav
 */
const QuestionsNav = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customize Question"
        component={QuestionsListScreen}
        options={{
          // WARNING: We assume the StackNav is nested inside a DrawerNav
          header: (props) => (
            <BaseAppBar {...(props as unknown as DrawerHeaderProps)} />
          ),
          title: t("routes:customizeQuestions"),
        }}
      />
      <Stack.Screen
        name="Add new question"
        component={AddNewQuestionScreen}
        options={{
          header: BackAppBar,
          title: t("routes:addNewQuestion"),
        }}
      />
      <Stack.Screen
        name="Edit Question"
        component={EditQuestionScreen}
        options={{ header: BackAppBar, title: t("routes:editQuestion") }}
      />
    </Stack.Navigator>
  );
};

export default QuestionsNav;

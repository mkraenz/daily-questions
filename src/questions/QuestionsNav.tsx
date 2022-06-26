import { DrawerHeaderProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BackAppBar from "../BackAppBar";
import BaseAppBar from "../BaseAppBar";
import AddNewQuestionScreen from "./AddNewQuestionScreen";
import EditQuestionScreen from "./EditQuestionScreen";
import { QuestionsStackParamList } from "./questions-nav";
import QuestionsListScreen from "./QuestionsListScreen";

const Stack = createStackNavigator<QuestionsStackParamList>();

/**
 * WARNING: We assume the StackNav is nested inside a DrawerNav
 */
const QuestionsNav = () => {
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
        }}
      />
      <Stack.Screen
        name="Add new question"
        component={AddNewQuestionScreen}
        options={{
          header: BackAppBar,
        }}
      />
      <Stack.Screen
        name="Edit Question"
        component={EditQuestionScreen}
        options={{ header: BackAppBar }}
      />
    </Stack.Navigator>
  );
};

export default QuestionsNav;

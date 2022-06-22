import { createStackNavigator } from "@react-navigation/stack";
import AddNewQuestionScreen from "./AddNewQuestionScreen";
import EditQuestionScreen from "./EditQuestionScreen";
import { QuestionsStackParamList } from "./questions-nav";
import QuestionsListScreen from "./QuestionsListScreen";

const Stack = createStackNavigator<QuestionsStackParamList>();

const QuestionsNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customize Question"
        component={QuestionsListScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="Add new question" component={AddNewQuestionScreen} />
      <Stack.Screen name="Edit Question" component={EditQuestionScreen} />
    </Stack.Navigator>
  );
};

export default QuestionsNav;

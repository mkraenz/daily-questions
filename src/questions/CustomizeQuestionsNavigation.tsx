import { createStackNavigator } from "@react-navigation/stack";
import AddNewQuestionScreen from "./AddNewQuestionScreen";
import { CustomizeQuestionsStackParamList } from "./questions-nav";
import CustomizeQuestionsScreen from "./CustomizeQuestionsScreen";

const Stack = createStackNavigator<CustomizeQuestionsStackParamList>();

const CustomizeQuestionsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customize Question"
        component={CustomizeQuestionsScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="Add new question" component={AddNewQuestionScreen} />
    </Stack.Navigator>
  );
};

export default CustomizeQuestionsNavigation;

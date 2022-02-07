import { createStackNavigator } from '@react-navigation/stack';

import QuestionScreen from '../screens/QuestionScreen';
import TopicScreen from '../screens/TopicScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const TopicStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Topic"
        options={() => ({
          title: 'Topic',
          headerTitleAlign: 'center',
        })}
        component={TopicScreen}
      />
      <Stack.Screen
        name="Question"
        options={() => ({
          title: 'Question',
          headerTitleAlign: 'center',
        })}
        component={QuestionScreen}
      />
    </Stack.Navigator>
  );
};

export default TopicStackNavigation;

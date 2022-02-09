import { createStackNavigator } from '@react-navigation/stack';

import HelpScreen from '../screens/HelpScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import TopicStackNavigation from './TopicStackNavigation';
const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const HelpStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Help"
        options={() => ({
          title: 'Help',
          headerTitleAlign: 'center',
        })}
        component={HelpScreen}
      />
      <Stack.Screen
        name="Topic-m"
        options={() => ({
          headerShown: false,
        })}
        component={TopicStackNavigation}
      />
      <Stack.Screen
        name="ContactUs"
        options={() => ({
          title: 'Contact Us',
          headerTitleAlign: 'center',
        })}
        component={ContactUsScreen}
      />
    </Stack.Navigator>
  );
};

export default HelpStackNavigation;

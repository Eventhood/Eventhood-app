import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from '../screens/HomeScreen';
import DisplayEventScreen from '../screens/DisplayEventScreen';
import ReportEventScreen from '../screens/ReportEventScreen';
import RatingScreen from '../screens/RatingScreen';
import RatingScrollScreen from '../screens/RatingScrollScreen';
const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const HomeNavigation = ({ navigation, route }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        options={() => ({
          headerShown: false,
        })}
        component={HomeScreen}
      />
      <Stack.Screen
        name="EventDetail"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={DisplayEventScreen}
      />
      <Stack.Screen
        name="ReportEvent"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={ReportEventScreen}
      />
      <Stack.Screen
        name="RatingScreen"
        options={() => ({
          headerTitle: 'Users Ratings',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={RatingScreen}
      />
      <Stack.Screen
        name="RatingScrollScreen"
        options={() => ({
          headerTitle: 'New Rating',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={RatingScrollScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

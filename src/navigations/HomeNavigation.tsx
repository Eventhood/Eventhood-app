import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from '../screens/HomeScreen';
import DisplayEventScreen from '../screens/DisplayEventScreen';
import ReportEventScreen from '../screens/ReportEventScreen';

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
    </Stack.Navigator>
  );
};

export default HomeNavigation;

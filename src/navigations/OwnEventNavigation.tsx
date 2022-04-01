import { createStackNavigator } from '@react-navigation/stack';

import YourEventScreen from '../screens/YourEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const OwnEventNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="YourEvent"
        options={() => ({
          headerTitleAlign: 'center',
          title: 'Hosted Events',
        })}
        component={YourEventScreen}
      />
      <Stack.Screen
        name="EditEvent"
        options={() => ({
          headerTitleAlign: 'center',
          title: 'Edit Event',
        })}
        component={EditEventScreen}
      />
      <Stack.Screen
        name="CreateEvent"
        options={() => ({
          headerTitleAlign: 'center',
          title: 'Create Event',
        })}
        component={CreateEventScreen}
      />
    </Stack.Navigator>
  );
};

export default OwnEventNavigation;

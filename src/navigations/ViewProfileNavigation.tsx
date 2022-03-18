import { createStackNavigator } from '@react-navigation/stack';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import DisplayEventScreen from '../screens/DisplayEventScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const ViewProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Profile"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={ViewProfileScreen}
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
    </Stack.Navigator>
  );
};

export default ViewProfileNavigation;

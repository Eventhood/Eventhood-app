import { createStackNavigator } from '@react-navigation/stack';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import DisplayEventScreen from '../screens/DisplayEventScreen';
import RatingScreen from '../screens/RatingScreen';
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
          headerShown: false,
        })}
        component={DisplayEventScreen}
      />

      <Stack.Screen
        name="MyRating"
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: 'Rating',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={RatingScreen}
      />
    </Stack.Navigator>
  );
};

export default ViewProfileNavigation;

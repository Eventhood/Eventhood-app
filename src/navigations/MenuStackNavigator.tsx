import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import YourEventScreen from '../screens/YourEventScreen';
import SignUpEventScreen from '../screens/SignUpEventScreen';
import FollowingScreen from '../screens/FollowingScreen';
import HelpScreen from '../screens/HelpScreen';
import LegalScreen from '../screens/LegalScreen';
import AboutScreen from '../screens/AboutScreen';
const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const MenuStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Menu"
        options={() => ({
          headerShown: false,
        })}
        component={MenuScreen}
      />
      <Stack.Screen
        name="Profile"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={ViewProfileScreen}
      />
      <Stack.Screen
        name="YourEvent"
        options={() => ({
          title: 'Your Event',
          headerTitleAlign: 'center',
        })}
        component={YourEventScreen}
      />
      <Stack.Screen
        name="SignUpEvent"
        options={() => ({
          title: 'Sign Up Event',
          headerTitleAlign: 'center',
        })}
        component={SignUpEventScreen}
      />
      <Stack.Screen
        name="Following"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={FollowingScreen}
      />
      <Stack.Screen
        name="Help"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={HelpScreen}
      />
      <Stack.Screen
        name="Legal"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={LegalScreen}
      />
      <Stack.Screen
        name="About"
        options={() => ({
          headerTitleAlign: 'center',
        })}
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
};

export default MenuStackNavigator;

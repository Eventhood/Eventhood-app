import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import MenuScreen from '../screens/MenuScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import YourEventScreen from '../screens/YourEventScreen';
import SignUpEventScreen from '../screens/SignUpEventScreen';
import FollowingScreen from '../screens/FollowingScreen';
import LegalScreen from '../screens/LegalScreen';
import AboutScreen from '../screens/AboutScreen';
import HelpStackNavigation from './HelpStackNavigation';
import EditUserNavigation from './EditUserNavigation';
import OwnEventNavigation from './OwnEventNavigation';
import ViewProfileNavigation from './ViewProfileNavigation';

const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const bottomNavHiddenRoutes = [
  'Profile-m',
  'YourEvent',
  'SignUpEvent',
  'Following',
  'Help-m',
  'Legal',
  'About',
  'EditProfile-m',
  'YourEvent-m',
];

const MenuStackNavigator = ({ navigation, route }: any) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';

    if (bottomNavHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#f9fafb',
          height: 75,
          shadowColor: '#000000',
          shadowOpacity: 0.5,
          shadowRadius: 1,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          elevation: 2,
        },
      });
    }
  }, [navigation, route]);
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
        name="Profile-m"
        options={() => ({
          headerShown: false,
          headerTitleAlign: 'center',
        })}
        component={ViewProfileNavigation}
      />
      <Stack.Screen
        name="YourEvent-m"
        options={() => ({
          headerShown: false,
        })}
        component={OwnEventNavigation}
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
        name="Help-m"
        options={() => ({
          headerShown: false,
        })}
        component={HelpStackNavigation}
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
      <Stack.Screen
        name="EditProfile-m"
        options={() => ({
          headerShown: false,
        })}
        component={EditUserNavigation}
      />
    </Stack.Navigator>
  );
};

export default MenuStackNavigator;

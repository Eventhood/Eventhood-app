import { createStackNavigator } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

import HomeScreen from '../screens/HomeScreen';
import DisplayEventScreen from '../screens/DisplayEventScreen';
import ReportEventScreen from '../screens/ReportEventScreen';
import ViewOtherProfileScreen from '../screens/ViewOtherProfileScreen';
import RatingScrollScreen from '../screens/RatingScrollScreen';
import RatingScreen from '../screens/RatingScreen';

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const bottomNavHiddenRoutes = [
  'EventDetail',
  'ReportEvent',
  'RateUser',
  'OtherUserProfile',
  'RatingList',
];

const HomeNavigation = ({ navigation, route }: any) => {
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
        name="Home"
        options={() => ({
          headerShown: false,
        })}
        component={HomeScreen}
      />
      <Stack.Screen
        name="EventDetail"
        options={() => ({
          headerShown: false,
        })}
        component={DisplayEventScreen}
      />
      <Stack.Screen
        name="OtherUserProfile"
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
        component={ViewOtherProfileScreen}
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
        name="RatingList"
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
      <Stack.Screen
        name="RateUser"
        options={() => ({
          headerTitleAlign: 'center',
          headerTitle: 'Rate User',
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

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import EditUsernameScreen from '../screens/EditUser/EditUsernameScreen';
import EditPasswordScreen from '../screens/EditUser/EditPasswordScreen';
import EditFullnameScreen from '../screens/EditUser/EditFullnameScreen';
import EditEmailScreen from '../screens/EditUser/EditEmailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: true,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

const EditUserNavigation = ({ navigation, route }: any) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="EditProfile"
        options={() => ({
          headerTitleAlign: 'center',
          title: 'Edit Profile',
        })}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="EditEmail"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackImage: () => <MaterialCommunityIcons name="close" size={24} color="black" />,
        })}
        component={EditEmailScreen}
      />
      <Stack.Screen
        name="EditFullname"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackImage: () => <MaterialCommunityIcons name="close" size={24} color="black" />,
        })}
        component={EditFullnameScreen}
      />
      <Stack.Screen
        name="EditPassword"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackImage: () => <MaterialCommunityIcons name="close" size={24} color="black" />,
        })}
        component={EditPasswordScreen}
      />
      <Stack.Screen
        name="EditUsername"
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackImage: () => <MaterialCommunityIcons name="close" size={24} color="black" />,
        })}
        component={EditUsernameScreen}
      />
    </Stack.Navigator>
  );
};

export default EditUserNavigation;

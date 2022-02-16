import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
const Stack = createStackNavigator();

const screenOptionStyle = {
  tabBarShowLabel: false,
  headerShown: false,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#F9FAFB',
  },
};

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MenuScreen from '../screens/MenuScreen';
import { View, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MenuStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomNavbar,
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="Home-b"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.centerIcon}>
                <AntDesign name="home" color={color} size={size} />
                {focused ? <View style={styles.dot} /> : null}
              </View>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search-b"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.centerIcon}>
                <Ionicons name="search" color={color} size={size} />
                {focused ? <View style={styles.dot} /> : null}
              </View>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Menu-b"
        component={MenuStackNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={styles.centerIcon}>
                <Ionicons name="md-menu" color={color} size={size} />
                {focused ? <View style={styles.dot} /> : null}
              </View>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavbar: {
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
  dot: {
    justifyContent: 'center',
    bottom: -4,
    width: 8,
    height: 3,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
  },
  centerIcon: {
    alignItems: 'center',
  },
});

export default BottomTab;

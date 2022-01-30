import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import style from '../styles/safeView';
import SafeAreaView from '../components/SafeAreaView';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text> Hello Home screen </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

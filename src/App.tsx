import { StyleSheet, StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigations/BottomTab';
import { NativeBaseProvider } from 'native-base';

const navTheme = DefaultTheme;
navTheme.colors.background = '#F5F5F5';

export default registerRootComponent(function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent"
        networkActivityIndicatorVisible={true}
      />
      <NavigationContainer theme={navTheme}>
        <BottomTab />
      </NavigationContainer>
    </NativeBaseProvider>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

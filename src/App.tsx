import { StatusBar, View, ActivityIndicator } from 'react-native';
import { registerRootComponent } from 'expo';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigations/BottomTab';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './utils/firebase';
import AuthStack from './navigations/AuthStack';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['NativeBase:']);

const navTheme = DefaultTheme;
navTheme.colors.background = '#F5F5F5';

const auth = getAuth(app);

export default registerRootComponent(function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{} | undefined>();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (users) => {
      if (users) {
        setUser(users);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUser(undefined);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar
          animated={true}
          translucent={true}
          barStyle="dark-content"
          backgroundColor="transparent"
          networkActivityIndicatorVisible={true}
        />
        {user ? <BottomTab /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
});

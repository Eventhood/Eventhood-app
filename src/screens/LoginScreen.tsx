import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, View, Platform } from 'react-native';
import { Input, Icon, Text, FormControl, Image, Center, Box, HStack, Button } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import ErrorMessage from '../components/ErrorMessage';
import SafeAreaView from '../components/SafeAreaView';
import { app } from '../utils/firebase';

const auth = getAuth(app);

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState('');
  const isFocused = useIsFocused();

  const onLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setLoginError('Username or Password cannot be empty');
    } else {
      signInWithEmailAndPassword(auth, email.trim(), password.trim())
        .then((userCredential) => {})
        .catch((error) => {
          setLoginError('Your email or password may be incorrect.');
        });
    }
  };

  useEffect(() => {
    setLoginError('');
  }, [isFocused]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Center my={8}>
            <Image source={require('../assets/logo.png')} alt="Alternate Text" size="xl" />
          </Center>
          <Box style={styles.container}>
            <Center my={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Welcome back!
              </Text>
              {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            </Center>
            <FormControl mb={2}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="example@domain.com"
                onChangeText={(email) => setEmail(email)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="*************"
                type={passwordVisibility ? 'text' : 'password'}
                onChangeText={(password) => setPassword(password)}
                InputRightElement={
                  <Icon
                    onPress={() => setPasswordVisibility(!passwordVisibility)}
                    as={
                      passwordVisibility ? (
                        <MaterialIcons name="visibility" />
                      ) : (
                        <MaterialIcons name="visibility-off" />
                      )
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                }
              />
            </FormControl>
            <Text
              style={styles.textForgotPassword}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            >
              Forgot Password?
            </Text>

            <Button style={styles.button} onPress={onLogin}>
              Login
            </Button>

            <Center>
              <Text>
                Newbie?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                  Create Account
                </Text>
              </Text>
            </Center>
          </Box>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: '100%',
  },
  textForgotPassword: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'right',
  },
  text: {
    color: '#6b7280',
    textAlign: 'center',
    margin: 4,
  },
  button: {
    backgroundColor: '#3B82F6',
    margin: 20,
    height: 50,
  },
  link: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  icon: {
    borderColor: '#6b728075',
    borderRadius: 100,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;

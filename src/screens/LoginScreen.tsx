import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, View, Platform } from 'react-native';
import { Input, Icon, Text, FormControl, Image, Center, Box, HStack, Button } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import ErrorMessage from '../components/ErrorMessage';
import SafeAreaView from '../components/SafeAreaView';
import { app } from '../utils/firebase';

const auth = getAuth(app);

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        setLoginError('Your email or password may be incorrect.');
      });
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Center my={8}>
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              size="xl"
            />
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

            <Text style={styles.text}>Or Log In with</Text>

            <HStack my={4} space={8} justifyContent="center">
              <Center style={styles.icon}>
                <AntDesign name="google" size={20} color="#DB4437" />
              </Center>
              <Center style={styles.icon}>
                <AntDesign name="facebook-square" size={20} color="#4267B2" />
              </Center>
              {Platform.OS === 'ios' ? (
                <Center style={styles.icon}>
                  <AntDesign name="apple1" size={20} color="#000000" />
                </Center>
              ) : null}
            </HStack>
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

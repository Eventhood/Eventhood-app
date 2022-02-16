import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TouchableWithoutFeedback, Keyboard, Platform, StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Text, FormControl, Image, Center, Box, HStack, Button } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { app } from '../utils/firebase';
import ErrorMessage from '../components/ErrorMessage';
import SafeAreaViewTransparent from '../components/SafeAreaViewTransparent';

const auth = getAuth(app);

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [signupError, setSignupError] = useState('');

  const onHandleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User is login', userCredential.user);
      })
      .catch((error) => {
        setSignupError(error.message);
      });
  };
  return (
    <SafeAreaViewTransparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
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
                Get Started
              </Text>
              {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
            </Center>

            <FormControl mb={2}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="username"
                onChangeText={(username) => setUsername(username)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormControl.Label>Full name</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="full name"
                onChangeText={(fullName) => setFullName(fullName)}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormControl.Label>Phone number</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="+1 111 1111"
                onChangeText={(fullName) => setFullName(fullName)}
              />
            </FormControl>
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

            <Button style={styles.button} onPress={onHandleSignup}>
              Create an Account
            </Button>

            <Text style={styles.text}>Or Sign Up with</Text>

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

            <Center mb={8}>
              <Text>
                Member?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            </Center>
          </Box>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaViewTransparent>
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

export default SignupScreen;

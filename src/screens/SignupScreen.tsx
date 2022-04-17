import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { TouchableWithoutFeedback, Keyboard, Platform, StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Text, FormControl, Image, Center, Box, HStack, Button } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { URL } from '@env';

import { app } from '../utils/firebase';
import ErrorMessage from '../components/ErrorMessage';
import SafeAreaViewTransparent from '../components/SafeAreaViewTransparent';

const auth = getAuth(app);

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSignup = () => {
    if (username.trim() === '') {
      setSignupError('Username cannot be empty');
    } else if (fullName.trim() === '') {
      setSignupError('Full name cannot be empty');
    } else if (email.trim() === '') {
      setSignupError('Email cannot be empty');
    } else if (password.trim() === '') {
      setSignupError('Password cannot be empty');
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((createdUserData: UserCredential) => {
          (async () => {
            const bodyData = {
              userData: {
                uuid: createdUserData.user.uid,
                displayName: fullName,
                accountHandle: username,
                photoURL: `https://ui-avatars.com/api/?name=${fullName.replace(/\s/g, '+')}`,
                creationTime: createdUserData.user.metadata.creationTime,
                isAdministrator: false,
                email: createdUserData.user.email,
              },
            };

            await fetch(`${URL}/api/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bodyData),
            });

            updateProfile(createdUserData.user, {
              displayName: fullName,
              photoURL: `https://ui-avatars.com/api/?name=${fullName.replace(/\s/g, '+')}`,
            }).catch((error) => {
              setSignupError(error.message);
            });
          })();
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          switch (error.code) {
            case 'auth/invalid-email':
              setSignupError('Invalid email');
              break;
            case 'auth/email-already-in-use':
              setSignupError('Email already exist');
              break;
            case 'auth/weak-password':
              setSignupError('Password should be at least 6 characters');
              break;
            default:
              setSignupError(error.message || 'Internal Error');
          }
        });
    }
  };
  return (
    <SafeAreaViewTransparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Center my={8}>
            <Image source={require('../assets/logo.png')} alt="Alternate Text" size="xl" />
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
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="example@domain.com"
                onChangeText={(email) => setEmail(email.trim())}
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

            <Button
              disabled={isLoading}
              style={isLoading ? styles.buttonDisable : styles.button}
              onPress={onHandleSignup}
            >
              Create an Account
            </Button>

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
  buttonDisable: {
    backgroundColor: '#3B82F675',
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

import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, View } from 'react-native';
import { Input, Modal, Text, FormControl, Image, Center, Box, HStack, Button } from 'native-base';

import { app } from '../utils/firebase';
import ErrorMessage from '../components/ErrorMessage';
import SafeAreaView from '../components/SafeAreaView';

const auth = getAuth(app);

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [forgotPassError, setForgotPassError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const forgotPasswordHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowModal(true);
      })
      .catch((error) => {
        setForgotPassError(error.message);
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
                Reset Password
              </Text>
              {forgotPassError ? <ErrorMessage error={forgotPassError} visible={true} /> : null}
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
            <HStack space={3} justifyContent="center">
              <Button
                _text={{
                  color: '#3B82F6',
                }}
                style={styles.buttonOutline}
                onPress={() => navigation.navigate('Login')}
              >
                Return
              </Button>
              <Button style={styles.button} onPress={forgotPasswordHandler}>
                Send
              </Button>
            </HStack>
          </Box>
          <Modal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              navigation.navigate('Login');
            }}
          >
            <Modal.Content style={styles.modal}>
              <Modal.Body>
                <Text fontSize="md" fontWeight="normal">
                  We will send you a recovery email within a few minutes. If you have not received
                  an email check your spam folder or Contact Support at support@eventhood.ca
                </Text>
                <Button
                  style={styles.button}
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('Login');
                  }}
                >
                  OK
                </Button>
              </Modal.Body>
            </Modal.Content>
          </Modal>
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
  button: {
    backgroundColor: '#3B82F6',
    flex: 1,
    height: 50,
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
    flex: 1,
    marginTop: 20,
    height: 50,
  },
  modal: {
    padding: 10,
  },
});

export default ForgotPassword;

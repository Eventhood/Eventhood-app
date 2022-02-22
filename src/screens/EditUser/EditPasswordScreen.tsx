import { Text, Box, Input, Button, Icon } from 'native-base';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';

import { app } from '../../utils/firebase';
import ErrorMessage from '../../components/ErrorMessage';

const auth = getAuth(app);

const EditPasswordScreen = ({ navigation, route }: any) => {
  const [value, setValue] = useState('');
  const [valueConfirm, setValueConfirm] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (value && value === valueConfirm) {
      setError('');
      if (auth.currentUser) {
        updatePassword(auth.currentUser, value)
          .then(() => {
            navigation.goBack();
          })
          .catch((error) => {
            setError('Incorrect Password, make sure both new and confirm password match');
          });
      }
    } else {
      setError('Incorrect Password, make sure both new and confirm password match');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box px={4} style={styles.box}>
        <Box>
          <ErrorMessage error={error} visible={error ? true : false} />
          <Text fontSize={'lg'} mb="4">
            New Password
          </Text>
          <Input
            bg={'#ffffff'}
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
            variant="filled"
            placeholder=""
            type={passwordVisibility ? 'text' : 'password'}
            InputRightElement={
              <>
                <Icon
                  key={1}
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
                  color="black"
                />
                <Icon
                  key={2}
                  as={
                    <MaterialCommunityIcons
                      name="close"
                      onPress={() => {
                        setValue('');
                      }}
                    />
                  }
                  size={5}
                  mr="2"
                  color="black"
                />
              </>
            }
          />
          <Text fontSize={'lg'} mt="4" mb="4">
            Confirm Password
          </Text>
          <Input
            bg={'#ffffff'}
            value={valueConfirm}
            onChangeText={(text) => {
              setValueConfirm(text);
            }}
            variant="filled"
            placeholder=""
            type={passwordConfirmVisibility ? 'text' : 'password'}
            InputRightElement={
              <>
                <Icon
                  key={1}
                  onPress={() => setPasswordConfirmVisibility(!passwordConfirmVisibility)}
                  as={
                    passwordConfirmVisibility ? (
                      <MaterialIcons name="visibility" />
                    ) : (
                      <MaterialIcons name="visibility-off" />
                    )
                  }
                  size={5}
                  mr="2"
                  color="black"
                />
                <Icon
                  key={2}
                  as={
                    <MaterialCommunityIcons
                      name="close"
                      onPress={() => {
                        setValueConfirm('');
                      }}
                    />
                  }
                  size={5}
                  mr="2"
                  color="black"
                />
              </>
            }
          />
        </Box>

        <Button onPress={handleSave} style={styles.button}>
          Update Password
        </Button>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30 },
  box: { display: 'flex', flex: 1, justifyContent: 'space-between' },
});

export default EditPasswordScreen;

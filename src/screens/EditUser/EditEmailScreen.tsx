import { Text, Box, Input, Button, Icon } from 'native-base';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { getAuth, updateEmail } from 'firebase/auth';
import { URL } from '@env';

import { app } from '../../utils/firebase';
import ErrorMessage from '../../components/ErrorMessage';

const auth = getAuth(app);

const EditEmailScreen = ({ navigation, route }: any) => {
  const [value, setValue] = useState(route.params.value);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (value) {
      if (value != route.params.value) {
        const bodyData = {
          userData: {
            email: value,
          },
        };
        setError('');
        if (auth.currentUser) {
          updateEmail(auth.currentUser, value)
            .then(() => {
              (async () => {
                await fetch(`${URL}/api/users/${route.params.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(bodyData),
                });
                navigation.goBack();
              })();
            })
            .catch((error) => {
              setError('Incorrect Email');
            });
        }
      } else {
        navigation.goBack();
      }
    } else {
      setError('Incorrect Email');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box px={4} style={styles.box}>
        <Box>
          <Text fontSize={'lg'} mb="4">
            Email
          </Text>
          <ErrorMessage error={error} visible={error ? true : false} />
          <Input
            bg={'#ffffff'}
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
            variant="filled"
            placeholder=""
            InputRightElement={
              <Icon
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
            }
          />
        </Box>

        <Button onPress={handleSave} style={styles.button}>
          Update Email
        </Button>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30 },
  box: { display: 'flex', flex: 1, justifyContent: 'space-between' },
});

export default EditEmailScreen;

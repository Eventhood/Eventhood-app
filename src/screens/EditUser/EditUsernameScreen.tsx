import { Text, Box, Input, Button, Icon } from 'native-base';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { URL } from '@env';

import ErrorMessage from '../../components/ErrorMessage';

const EditUsernameScreen = ({ navigation, route }: any) => {
  const [value, setValue] = useState(route.params.value);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (value && value.indexOf(' ') < 0) {
      if (value != route.params.value) {
        const bodyData = {
          userData: {
            accountHandle: value,
          },
        };
        setError('');
        await fetch(`${URL}/api/users/${route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    } else {
      setError('Incorrect Username');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box px={4} style={styles.box}>
        <Box>
          <Text fontSize={'lg'} mb="4">
            Username
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
                      setValue(undefined);
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
          Update Username
        </Button>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30 },
  box: { display: 'flex', flex: 1, justifyContent: 'space-between' },
});

export default EditUsernameScreen;

import { Text, Box, Input, Button, Icon } from 'native-base';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const EditPasswordScreen = ({ navigation, route }: any) => {
  const [value, setValue] = useState('');
  const [valueConfirm, setValueConfirm] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box px={4} style={styles.box}>
        <Box>
          <Box>
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
          </Box>
          <Box>
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
        </Box>

        <Button onPress={() => navigation.goBack()} style={styles.button}>
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

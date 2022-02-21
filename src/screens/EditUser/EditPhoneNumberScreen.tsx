import { Text, Box, Input, Button, Icon } from 'native-base';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const EditPhoneNumberScreen = ({ navigation, route }: any) => {
  const [value, setValue] = useState(route.params.value);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box px={4} style={styles.box}>
        <Box>
          <Text fontSize={'lg'} mb="4">
            Phone number
          </Text>
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

        <Button onPress={() => navigation.goBack()} style={styles.button}>
          Update Phone number
        </Button>
      </Box>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30 },
  box: { display: 'flex', flex: 1, justifyContent: 'space-between' },
});

export default EditPhoneNumberScreen;

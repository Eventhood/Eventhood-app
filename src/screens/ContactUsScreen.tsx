import { View, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import {
  Select,
  Box,
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
  Button,
  TextArea,
  Text,
} from 'native-base';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

import { app } from '../utils/firebase';
import { URL } from '@env';

interface Topic {
  _id: string;
  name: string;
}

const auth = getAuth(app);

const ContactUsScreen = ({ navigation }: any) => {
  const [topics, setTopics] = useState<Topic[] | undefined>();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const submitHandler = async () => {
    setMessageError(message ? false : true);
    setCategoryError(category ? false : true);

    if (message && category) {
      const res = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`);
      const jsonRes = await res.json();

      await fetch(`${URL}/api/contactrequests	`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactRequestData: {
            user: jsonRes.data._id,
            topic: category,
            message: message,
          },
        }),
      });
    }
  };

  const fetchTopics = async () => {
    const response = await fetch(`${URL}/api/supporttopics`);
    const json = await response.json();
    setTopics(json.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <FormControl isRequired isInvalid={categoryError} mt="8" px="4">
          <FormControl.Label>
            <Text fontSize="xl" fontWeight="semibold">
              Category
            </Text>
          </FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="Choose Category"
            placeholder="Choose Category"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            onValueChange={(category) => setCategory(category)}
          >
            {topics ? (
              topics.map((topic, key) => {
                return <Select.Item label={topic.name} value={topic._id} key={key} />;
              })
            ) : (
              <Select.Item label="No topic" value="No topic" key="No topic" />
            )}
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={messageError} mt="8" px="4" key={13}>
          <FormControl.Label>
            <Text fontSize="xl" fontWeight="semibold">
              Message
            </Text>
          </FormControl.Label>
          <TextArea h={40} placeholder="Your message" onChangeText={(text) => setMessage(text)} />

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please write a message!
          </FormControl.ErrorMessage>
        </FormControl>
        <Box px="4" mt="16">
          <Button
            onPress={async () => {
              await submitHandler();
              navigation.goBack();
            }}
            style={styles.button}
          >
            Send
          </Button>
        </Box>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#27272A',
    color: '#FFFFFF',
    height: 60,
  },
});

export default ContactUsScreen;

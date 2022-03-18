import {
  View,
  ScrollView,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  Text,
  TextArea,
  Center,
  Button,
  Image,
  Select,
  FormControl,
  CheckIcon,
  WarningOutlineIcon,
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

const ReportEventScreen = ({ navigation }: any) => {
  const [topics, setTopics] = useState<Topic[] | undefined>();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const submitHandler = async () => {
    setMessageError(message ? false : true);
    setCategoryError(category ? false : true);

    if (message && category) {
      const res = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });
      const jsonRes = await res.json();

      try {
        await fetch(`${URL}/api/reportrequests	`, {
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
      } catch (e) {
        console.log(e);
      }
    }
  };

  const fetchTopics = async () => {
    const response = await fetch(`${URL}/api/reporttopics`);
    const json = await response.json();
    setTopics(json.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: 120,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Image
            source={{
              uri: 'https://media.istockphoto.com/vectors/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-vector-id1150481340?k=20&m=1150481340&s=612x612&w=0&h=y_RdS4lPY2p7O_bh1ZhaeLLOOuSLNBaHZFMdmgdQaVE=',
            }}
            style={{
              width: '100%',
              height: 300,
              resizeMode: 'cover',
            }}
            alt="Event Picture"
          />
        </View>
        <View style={styles.spacing}>
          <Text fontSize="3xl" fontWeight="normal">
            Reporting Title
          </Text>
        </View>
        <View>
          <Center>
            <FormControl isRequired isInvalid={categoryError} mt="8" px="4">
              <FormControl.Label>
                <Text fontSize="xl" fontWeight="semibold">
                  Report Topic
                </Text>
              </FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Select Dropdown Option"
                placeholder="Select Dropdown Option"
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
                Please Select An Option!
              </FormControl.ErrorMessage>
            </FormControl>
          </Center>
        </View>
        <FormControl isRequired isInvalid={messageError} mt="8" px="4" key={13}>
          <FormControl.Label>
            <Text fontSize="xl" fontWeight="semibold">
              Reason
            </Text>
          </FormControl.Label>
          <TextArea h={40} placeholder="Your message" onChangeText={(text) => setMessage(text)} />

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please write a message!
          </FormControl.ErrorMessage>
        </FormControl>

        <Center>
          <View style={styles.user}>
            <Button
              onPress={async () => {
                await submitHandler();
                navigation.goBack();
              }}
              style={styles.submit}
              shadow={4}
              _text={{
                color: 'white',
              }}
            >
              Submit Request
            </Button>
          </View>
        </Center>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ReportEventScreen;

const styles = StyleSheet.create({
  spacing: {
    marginHorizontal: 10,
    marginTop: 110,
  },
  subtitle: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  selection: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },

  user: { marginHorizontal: 0, marginTop: 60 },

  submit: {
    width: 300,
    height: 70,
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 2,
  },
  input: {
    height: 200,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
  },
});

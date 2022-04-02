import {
  Text,
  Box,
  TextArea,
  HStack,
  Input,
  Button,
  Select,
  CheckIcon,
  Modal,
  Center,
} from 'native-base';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import ErrorMessage from '../components/ErrorMessage';
import { URL } from '@env';

const EditEventScreen = ({ navigation, route }: any) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCancelEvent = async () => {
    setIsLoading(true);

    await fetch(`${URL}/api/events/${route.params.id}`, {
      method: 'DELETE',
    });
    setShowModal(false);
    setIsLoading(false);
    navigation.goBack();
  };

  const handleUpdateEvent = async () => {
    const timeNow = new Date();
    timeNow.setHours(timeNow.getHours() + 2);
    if (name.trim() === '') {
      setError('Event name cannot be empty.');
    } else if (location.trim() === '') {
      setError('Location cannot be empty.');
    } else if (category.trim() === '') {
      setError('Category cannot be empty.');
    } else if (maxParticipants.trim() === '') {
      setError('Max participants cannot be empty.');
    } else if (isNaN(Number(maxParticipants))) {
      setError('Max participants should be a number.');
    } else if (date.getTime() < timeNow.getTime()) {
      setError('The event time must at least be 2 hours from now.');
    } else if (description.trim() === '') {
      setError('Description cannot be empty.');
    } else {
      setIsLoading(true);

      await fetch(`${URL}/api/events/${route.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventData: {
            name: name.trim(),
            location: location.trim(),
            category: category.trim(),
            maxParticipants: maxParticipants.trim(),
            description: description.trim(),
            startTime: date,
          },
        }),
      });
      setIsLoading(false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`${URL}/api/eventcategories`);
      const jsonRes = await response.json();

      setCategoryList(jsonRes.data);
      const resEvent = await fetch(`${URL}/api/events/single/${route.params.id}`);
      const jsonResEvent = await resEvent.json();

      setName(jsonResEvent.data.name);
      setCategory(jsonResEvent.data.category._id);
      setMaxParticipants(jsonResEvent.data.maxParticipants.toString());
      setDescription(jsonResEvent.data.description);
      setLocation(jsonResEvent.data.location.address);
      setDate(new Date(jsonResEvent.data.startTime));
    })();
  }, []);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box p={4}>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Name
            </Text>
            <Input
              bg={'#ffffff'}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              variant="filled"
              placeholder=""
            />
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Location
            </Text>
            <Input
              bg={'#ffffff'}
              value={location}
              onChangeText={(text) => {
                setLocation(text);
              }}
              variant="filled"
              placeholder=""
            />
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Category
            </Text>
            <Select
              selectedValue={category}
              minWidth="200"
              accessibilityLabel="Choose Category"
              placeholder="Choose Category"
              bg={'#ffffff'}
              _selectedItem={{
                bg: '#ffffff',
                endIcon: <CheckIcon size={5} />,
              }}
              onValueChange={(category) => setCategory(category)}
            >
              {categoryList ? (
                categoryList.map((category_: any, key: any) => {
                  return <Select.Item label={category_.name} value={category_._id} key={key} />;
                })
              ) : (
                <Select.Item label="No topic" value="No topic" key="No topic" />
              )}
            </Select>
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Max number of participant
            </Text>
            <Input
              bg={'#ffffff'}
              type="number"
              value={maxParticipants}
              onChangeText={(text) => {
                setMaxParticipants(text);
              }}
              variant="filled"
              placeholder=""
            />
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Date
            </Text>
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={(event: any, selectedDate: any) => {
                  if (selectedDate) setDate(selectedDate);
                  setShowDate(false);
                }}
              />
            )}
            <View>
              <Button
                onPress={() => {
                  setShowDate(true);
                }}
                bg={'#ffffff'}
              >
                {date ? moment(date).format('DD MMMM YYYY') : ' '}
              </Button>
            </View>
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Time
            </Text>
            {showTime && (
              <DateTimePicker
                testID="dateTimePicker1"
                mode="time"
                value={date}
                is24Hour={false}
                display="default"
                onChange={(event: any, selectedDate: any) => {
                  if (selectedDate) setDate(selectedDate);
                  setShowTime(false);
                }}
              />
            )}
            <View>
              <Button
                onPress={() => {
                  setShowTime(true);
                }}
                bg={'#ffffff'}
              >
                {date ? moment(date).format('hh:mm A') : ' '}
              </Button>
            </View>
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Description
            </Text>
            <TextArea
              h={40}
              bg={'#ffffff'}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </Box>
          <Box mt={4}>
            <ErrorMessage error={error} visible={error ? true : false} />
          </Box>
          <Button
            _text={{
              fontWeight: 'semibold',
            }}
            style={isLoading ? styles.buttonDisabled : styles.button}
            disabled={isLoading}
            onPress={async () => {
              await handleUpdateEvent();
            }}
          >
            Update Event
          </Button>

          <Button
            style={isLoading ? styles.buttonDeleteDisabled : styles.buttonDelete}
            disabled={isLoading}
            _text={{
              fontWeight: 'semibold',
            }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            Cancel Event
          </Button>
        </Box>
      </TouchableWithoutFeedback>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Content style={styles.modal}>
          <Modal.Body>
            <Center>
              <Text fontSize="lg" fontWeight="semibold" m={4}>
                Do you wish to delete this event?
              </Text>
            </Center>
            <HStack alignItems="center" space={4}>
              <Button
                style={isLoading ? styles.buttonModalDisabled : styles.buttonModal}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                No
              </Button>
              <Button
                style={isLoading ? styles.cancelModalDisabled : styles.cancelModal}
                onPress={async () => {
                  await handleCancelEvent();
                }}
              >
                Yes
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: '#6b7280',
    height: 50,
    marginBottom: 30,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#000000',
    height: 50,
    marginBottom: 30,
    marginTop: 30,
  },
  buttonDelete: {
    backgroundColor: '#EF4444',
    height: 50,
    marginBottom: 30,
  },
  buttonDeleteDisabled: {
    backgroundColor: '#fca5a5',
    height: 50,
    marginBottom: 30,
  },
  modal: {
    padding: 10,
  },
  buttonModal: {
    backgroundColor: '#000000',
    height: 40,
    flex: 1,
  },
  cancelModal: {
    backgroundColor: '#EF4444',
    height: 40,
    flex: 1,
  },
  buttonModalDisabled: {
    backgroundColor: '#6b7280',
    height: 40,
    flex: 1,
  },
  cancelModalDisabled: {
    backgroundColor: '#fca5a5',
    height: 40,
    flex: 1,
  },
});

export default EditEventScreen;

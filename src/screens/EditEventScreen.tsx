import { Text, Box, TextArea, Input, Button, Select, CheckIcon } from 'native-base';
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

  const handleCancelEvent = async () => {
    await fetch(`${URL}/api/events/${route.params.id}`, {
      method: 'DELETE',
    });
  };

  const handleUpdateEvent = async () => {
    await fetch(`${URL}/api/events/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventData: {
          name: name,
          location: location,
          category: category,
          maxParticipants: maxParticipants,
          description: description,
          startTime: date,
        },
      }),
    });
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
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
            <ErrorMessage error={error} visible={error ? true : false} />
            <TextArea
              h={40}
              bg={'#ffffff'}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </Box>
          <Button
            _text={{
              fontWeight: 'semibold',
            }}
            style={styles.button}
            onPress={async () => {
              await handleUpdateEvent();
              console.log('updated');
              navigation.goBack();
            }}
          >
            Update Event
          </Button>

          <Button
            style={styles.buttonDelete}
            _text={{
              fontWeight: 'semibold',
            }}
            onPress={async () => {
              await handleCancelEvent();
              console.log('deleted');
              navigation.goBack();
            }}
          >
            Cancel Event
          </Button>
        </Box>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30, marginTop: 30 },
  buttonDelete: {
    backgroundColor: '#EF4444',
    height: 50,
    marginBottom: 30,
  },
});

export default EditEventScreen;

import { Text, Box, TextArea, Input, Button } from 'native-base';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import ErrorMessage from '../components/ErrorMessage';

const CreateEventScreen = () => {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const [categoryList, setCategoryList] = useState('');

  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  const [error, setError] = useState('');
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
              value={value}
              onChangeText={(text) => {
                setValue(text);
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
              value={value}
              onChangeText={(text) => {
                setValue(text);
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
            <Input
              bg={'#ffffff'}
              value={value}
              onChangeText={(text) => {
                setValue(text);
              }}
              variant="filled"
              placeholder=""
            />

            {/* <Select
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
                  return <Select.Item label={topic.name} value={topic.name} key={key} />;
                })
              ) : (
                <Select.Item label="No topic" value="No topic" key="No topic" />
              )}
            </Select> */}
          </Box>
          <Box mt={4}>
            <Text fontSize={'lg'} mb="4">
              Max number of participant
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
            <TextArea h={40} bg={'#ffffff'} />
          </Box>
          <Button style={styles.button}>Create Event</Button>
        </Box>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#000000', height: 50, marginBottom: 30, marginTop: 30 },
});

export default CreateEventScreen;

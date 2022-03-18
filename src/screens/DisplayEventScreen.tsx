import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Text, Center, Button, Avatar, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { URL } from '@env';

const DisplayEventScreen = ({ navigation, route }: any) => {
  const [event, setEvent] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${URL}/api/events/single/${route.params.id}`);
        const jsonRes = await res.json();

        // console.log(jsonRes);
        setEvent(jsonRes.data);
      } catch (e) {
        console.log('error on fetch post');
      }
    })();
    console.log(route.params.id);
  }, []);
  return (
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
          source={event ? { uri: event.category.header } : require('../assets/logo.png')}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'cover',
          }}
          alt="Event Picture"
        />
      </View>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#D1D5DB75"
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
        }}
        onPress={() => navigation.navigate('ReportEvent')}
      >
        <Ionicons name="flag" size={35} />
      </TouchableHighlight>
      <View>
        <Text
          style={{
            position: 'absolute',
            color: 'white',
            right: 10,
            top: 55,
          }}
        >
          30km
        </Text>
      </View>

      <View style={{ left: 10, flexDirection: 'row' }}>
        <View>
          <Text
            style={{
              top: 110,
              paddingLeft: 2,
            }}
            fontSize="2xl"
            fontWeight="semibold"
          >
            {event ? event.name : 'Event name'}
          </Text>
        </View>
        <View style={styles.btn}>
          <Button
            style={styles.register}
            shadow={4}
            _text={{
              color: '#3B82F6',
              paddingRight: 3,
            }}
          >
            Register
          </Button>
        </View>
      </View>

      <Text
        style={{
          left: 2,
          top: 120,
        }}
        marginLeft={10}
      >
        Created By:
      </Text>
      <View style={{ left: 10, flexDirection: 'row' }}>
        <View style={{ top: 130, flexDirection: 'row' }}>
          <Avatar
            style={{}}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
            }}
          >
            AK
          </Avatar>

          <Text
            style={{
              top: 11,
              paddingLeft: 2,
            }}
            fontSize="lg"
          >
            @{event ? event.host.accountHandle : 'Username'}
          </Text>
        </View>
        <View style={styles.btn2}>
          <Button
            style={styles.follow}
            shadow={4}
            _text={{
              color: '#3B82F6',
            }}
          >
            Follow
          </Button>
        </View>
      </View>
      <View
        style={{
          top: 150,
        }}
      >
        <View>
          <Text marginLeft={5} marginTop={3} fontSize="sm" fontWeight="light">
            Description:
          </Text>
          <Text marginLeft={5} marginRight={5} fontSize="sm" fontWeight="light">
            {event ? event.description : ''}
          </Text>
        </View>
        <View>
          <Text marginLeft={5} marginTop={5} fontSize="sm" fontWeight="medium">
            Category: {event ? event.category.name : ''}
          </Text>
          <Text marginLeft={5} marginRight={5} marginTop={2} fontSize="sm" fontWeight="medium">
            Date:
            {event
              ? ` ${moment(event.startTime).format('DD MMMM YYYY')} at ${moment(
                  event.startTime
                ).format('hh:mm A')}`
              : ''}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text marginLeft={5} marginRight={5} marginTop={2} fontSize="sm" fontWeight="medium">
            Max Partipants: {event ? event.maxParticipants : ''}
          </Text>
          <View>
            <Ionicons style={styles.max} name="people-sharp" size={15} />
          </View>
        </View>
        <View>
          <Text marginLeft={5} marginTop={5} fontSize="sm" fontWeight="medium">
            Location:
          </Text>
          <Text marginLeft={8} fontSize="sm" fontWeight="light">
            {event ? event.location.address : ''}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  btn: {
    paddingRight: 2,
    position: 'absolute',
    right: 150,
  },

  btn2: { paddingRight: 2, position: 'absolute', right: 220 },

  register: {
    paddingRight: 2,
    position: 'absolute',

    top: 110,
    width: 125,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },

  follow: {
    paddingRight: 10,
    position: 'absolute',
    left: 70,
    top: 140,
    width: 100,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  max: {
    margin: 5,
    position: 'absolute',
    top: 6,
    left: 2,
    width: 15,
    height: 15,
  },
  innerText: {
    color: 'white',
    fontSize: 15,
    left: 6,
  },
  imageText: {
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    borderRadius: 30,
    top: 170,
    left: 360,
    right: 10,
    bottom: 470,
    backgroundColor: 'black',
  },
});

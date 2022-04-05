import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Center, Button, Container, Avatar } from 'native-base';
import { URL } from '@env';
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';

import EventCard from '../components/EventCard';
import { app } from '../utils/firebase';

const auth = getAuth(app);

const ViewProfileScreen = ({ route, navigation }: any) => {
  const [profile, setProfile] = useState<any>();
  const [eventList, setEventList] = useState([]);
  const isFocused = useIsFocused();
  const [location, setLocation] = useState<any>();
  const [ratingTotal, setRatingTotal] = useState(0);

  const fetchProfile = async () => {
    const response = await fetch(`${URL}/api/users/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
      },
    });
    const json = await response.json();
    setProfile(json.data);

    const resEvent = await fetch(`${URL}/api/events/user/${json.data._id}`);
    const jsonResEvent = await resEvent.json();
    setEventList(jsonResEvent.data);

    const resRating = await fetch(`${URL}/api/ratings/${json.data._id}`);
    const jsonResRating = await resRating.json();
    setRatingTotal(
      jsonResRating.data.reduce((x: any, y: any) => {
        return x + y.rating;
      }, 0) / jsonResRating.data.length
    );
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchProfile();
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      let locationInfo = await Location.requestForegroundPermissionsAsync();

      while (locationInfo.status !== 'granted') {
        locationInfo = await Location.requestForegroundPermissionsAsync();
      }

      let locations = await Location.getCurrentPositionAsync({});
      setLocation(locations);
    })();
  }, [isFocused]);

  return (
    <ScrollView>
      <Center mt={4}>
        <Avatar
          shadow={4}
          size="xl"
          source={
            profile ? { uri: profile.photoURL } : require('../assets/default_profile_pic.jpg')
          }
        ></Avatar>
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          {profile ? profile.displayName : ''}
        </Text>
      </Center>
      <Center>
        <Text fontSize="xs" fontWeight="semibold">
          @{profile ? profile.accountHandle : ''}
        </Text>
      </Center>
      <Center>
        <View style={{ flexDirection: 'row' }}>
          <Center style={styles.buttonStyle}>
            <Text fontSize="lg" fontWeight="semibold" my={2}>
              Rating
            </Text>
            <Button
              style={styles.circle}
              shadow={4}
              _text={{
                color: '#3B82F6',
              }}
              onPress={() => {
                navigation.navigate('MyRating', { host: { _id: profile._id } });
              }}
            >
              {ratingTotal ? ratingTotal : '0'}
            </Button>
          </Center>
          <Center style={styles.buttonStyle}>
            <Text fontSize="lg" fontWeight="semibold" my={2}>
              Hosted
            </Text>
            <Button
              style={styles.circle}
              shadow={4}
              _text={{
                color: '#3B82F6',
              }}
            >
              {eventList ? eventList.length : '0'}
            </Button>
          </Center>
        </View>
      </Center>
      <Container>
        <Text fontSize="xl" fontWeight="bold" p={4}>
          Upcoming events
        </Text>
      </Container>
      {eventList ? (
        eventList.length > 0 ? (
          eventList.map((event, key) => {
            return (
              <EventCard navigation={navigation} eventInfo={event} key={key} location={location} />
            );
          })
        ) : (
          <Center>
            <Text fontSize="lg">No Event</Text>
          </Center>
        )
      ) : (
        <Center>
          <Text fontSize="lg">No Event</Text>
        </Center>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 50,
    marginTop: 4,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
});

export default ViewProfileScreen;

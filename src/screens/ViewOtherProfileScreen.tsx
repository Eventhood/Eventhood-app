import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Center, Button, Container, Avatar } from 'native-base';
import { URL } from '@env';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

import EventCard from '../components/EventCard';
import { app } from '../utils/firebase';

const auth = getAuth(app);

const ViewProfileScreen = ({ route, navigation }: any) => {
  const [profile, setProfile] = useState<any>();
  const [ownProfile, setOwnProfile] = useState<any>();
  const [eventList, setEventList] = useState([]);
  const [ratingTotal, setRatingTotal] = useState(0);
  const [location, setLocation] = useState<any>();
  const [isFollow, setIsFollow] = useState<any>(undefined);
  const [followedId, setFollowedId] = useState<any>(undefined);

  const isFocused = useIsFocused();

  const fetchProfile = async () => {
    setProfile(route.params.host);

    const resEvent = await fetch(`${URL}/api/events/user/${route.params.host._id}`);
    const jsonResEvent = await resEvent.json();
    setEventList(jsonResEvent.data);
  };

  const fetchRating = async () => {
    const resRating = await fetch(`${URL}/api/ratings/${route.params.host._id}`);
    const jsonResRating = await resRating.json();
    setRatingTotal(
      jsonResRating.data.reduce((x: any, y: any) => {
        return x + y.rating;
      }, 0) / jsonResRating.data.length
    );
  };

  const followHandler = async () => {
    try {
      const res = await fetch(`${URL}/api/follows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
        body: JSON.stringify({
          followData: {
            followedBy: ownProfile._id,
            following: route.params.host._id,
          },
        }),
      });

      const jsonRes = await res.json();
      setFollowedId(jsonRes.data._id);
      setIsFollow(true);
    } catch (e) {
      console.log(e);
    }
  };

  const unFollowHandler = async (id: string) => {
    try {
      const res = await fetch(`${URL}/api/follows/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });
      setFollowedId(undefined);
      setIsFollow(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchProfile();
        const res = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        });
        const jsonRes = await res.json();
        setOwnProfile(jsonRes.data);
        const resFollowing = await fetch(`${URL}/api/follows/following/${jsonRes.data._id}`);
        const jsonResFollowing = await resFollowing.json();
        if ('data' in jsonResFollowing) {
          for (let i = 0; i < jsonResFollowing.data.length; i++) {
            if (jsonResFollowing.data[i].following._id === route.params.host._id) {
              setIsFollow(true);
              setFollowedId(jsonResFollowing.data[i]._id);
              return;
            }
            setIsFollow(false);
          }
        } else {
          setIsFollow(false);
        }
        await fetchRating();
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
        {ownProfile ? (
          ownProfile._id !== route.params.host._id ? (
            isFollow ? (
              <Button
                style={styles.unFollow}
                _text={{
                  color: 'black',
                  textAlign: 'center',
                }}
                onPress={() => unFollowHandler(followedId)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                style={styles.follow}
                _text={{
                  color: 'black',
                  textAlign: 'center',
                }}
                onPress={followHandler}
              >
                Follow
              </Button>
            )
          ) : null
        ) : null}
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
              onPress={() => {
                navigation.navigate('RatingList', { host: profile });
              }}
              _text={{
                color: '#3B82F6',
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
  follow: {
    margin: 15,
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#3B82F6',
  },
  unFollow: {
    margin: 15,
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EF4444',
  },
});

export default ViewProfileScreen;

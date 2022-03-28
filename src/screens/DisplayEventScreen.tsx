import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { Text, Center, Button, Avatar, Image, Box, HStack, Modal } from 'native-base';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';

import SafeAreaView from '../components/SafeAreaView';
import { URL } from '@env';
import { app } from '../utils/firebase';
import { distance } from '../utils/location';

const auth = getAuth(app);

const DisplayEventScreen = ({ navigation, route }: any) => {
  const [event, setEvent] = useState<any>(undefined);
  const [mapUrl, setMapUrl] = useState('');
  const [userUUID, setUserUUID] = useState('');
  const [location, setLocation] = useState<any>();

  const [showModal, setShowModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const isFocused = useIsFocused();

  const registerEventHandler = () => {
    setShowModal(true);
  };

  const unregisterEventHandler = () => {
    setShowModal2(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const resUser = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        });
        const jsonResUser = await resUser.json();

        setUserUUID(jsonResUser.data._id);
        const res = await fetch(`${URL}/api/events/single/${route.params.id}`);
        const jsonRes = await res.json();

        setEvent(jsonRes.data);
        setMapUrl(
          `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-m-marker+285A98(${jsonRes.data.location.lon},${jsonRes.data.location.lat})/${jsonRes.data.location.lon},${jsonRes.data.location.lat},14,0/600x300@2x?access_token=pk.eyJ1IjoicGFuZGFub3giLCJhIjoiY2wxMTRsNDd5MmZmdjNsbXV2azk4Ym5vaCJ9.b8tYS-wkMhA64ldIcqnRLw&attribution=false&logo=false`
        );
      } catch (e) {
        console.log('error on fetch post');
      }
    })();
  }, []);

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
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>
        <Box>
          <Image
            source={event ? { uri: event.category.header } : require('../assets/logo.png')}
            alt="image"
            width="full"
            height={200}
          />

          <View style={styles.darkness}>
            <Box style={styles.imageHeaderNavigation}>
              <Ionicons
                name="chevron-back-circle-outline"
                size={28}
                color="white"
                onPress={() => {
                  navigation.goBack();
                }}
              />
              {event ? (
                userUUID === event.host._id ? null : (
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
                    <Ionicons name="flag" size={28} color="white" />
                  </TouchableHighlight>
                )
              ) : null}
            </Box>
            <Box style={styles.rangeBadgeBox}>
              <Text style={styles.rangeBadge}>
                {location && event
                  ? `${distance(
                      event.location.lat,
                      location.coords.latitude,
                      event.location.lon,
                      location.coords.longitude
                    )} Km`
                  : null}
              </Text>
            </Box>
          </View>
        </Box>
        <Box p={4}>
          <HStack justifyContent="space-between">
            <Text style={{ flex: 1 }} fontSize="xl" fontWeight="semibold">
              {event ? event.name : 'Event name'}
            </Text>
            <Center>
              {event ? (
                userUUID === event.host._id ? (
                  <Button
                    style={styles.registerButton}
                    shadow={4}
                    _text={{
                      color: '#3B82F6',
                    }}
                    onPress={registerEventHandler}
                  >
                    Register
                  </Button>
                ) : (
                  <Button
                    style={styles.unregisterButton}
                    shadow={4}
                    _text={{
                      color: '#EF4444',
                    }}
                    onPress={unregisterEventHandler}
                  >
                    Unregister
                  </Button>
                )
              ) : null}
            </Center>
          </HStack>
          <Box>
            <Text>Created by:</Text>
            <Box>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#D1D5DB75"
                onPress={() => {
                  navigation.navigate('OtherUserProfile', { host: event.host });
                }}
              >
                <HStack pt={2} style={styles.avatarBox}>
                  <Avatar
                    source={event ? { uri: event.host.photoURL } : require('../assets/logo.png')}
                  >
                    AK
                  </Avatar>
                  <Text ml={4}>@{event ? event.host.accountHandle : 'Username'}</Text>
                </HStack>
              </TouchableHighlight>
            </Box>
          </Box>

          <Box mt={4}>
            <Text fontSize="lg" fontWeight="semibold">
              Description:
            </Text>
            <Text>{event ? event.description : ''}</Text>

            <Text mt={4}>
              <Text fontSize="lg" fontWeight="semibold">
                Category:
              </Text>{' '}
              {event ? event.category.name : ''}
            </Text>

            <Text mt={4}>
              <Text fontSize="lg" fontWeight="semibold">
                Date:
              </Text>{' '}
              {event
                ? `${moment(event.startTime).format('DD MMMM YYYY')} at ${moment(
                    event.startTime
                  ).format('hh:mm A')}`
                : ''}
            </Text>

            <Text mt={4}>
              <Text fontSize="lg" fontWeight="semibold">
                Max participant:
              </Text>{' '}
              {event ? event.maxParticipants : ''} <Ionicons name="people-sharp" size={15} />
            </Text>

            <Text fontSize="lg" fontWeight="semibold" mt={4}>
              Location:
            </Text>
            <Text>{event ? event.location.address : ''}</Text>
            <Image
              source={
                mapUrl
                  ? {
                      uri: mapUrl,
                    }
                  : require('../assets/logo.png')
              }
              alt="map"
              width="full"
              height={200}
              mb={4}
              mt={4}
            />
          </Box>
        </Box>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <Modal.Content style={styles.modal}>
            <Modal.Body>
              <Center>
                <Text fontSize="md" fontWeight="normal" m={4}>
                  Registration is Completed!
                </Text>
              </Center>
              <Button
                style={styles.button}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                OK
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModal2}
          onClose={() => {
            setShowModal2(false);
          }}
        >
          <Modal.Content style={styles.modal}>
            <Modal.Body>
              <Center>
                <Text fontSize="md" fontWeight="normal" m={4}>
                  Event Unregistered!
                </Text>
              </Center>
              <Button
                style={styles.button}
                onPress={() => {
                  setShowModal2(false);
                }}
              >
                OK
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  darkness: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
  },
  rangeBadge: {
    padding: 10,
    position: 'relative',
    color: 'white',
  },
  rangeBadgeBox: {
    alignItems: 'flex-end',
    display: 'flex',
  },
  imageHeaderNavigation: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleHeaderBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  registerButton: {
    marginLeft: 8,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderColor: '#3B82F6',
    borderWidth: 1,
  },
  unregisterButton: {
    marginLeft: 8,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  followButton: {
    marginLeft: 8,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderColor: '#3B82F6',
    borderWidth: 1,
    width: '50%',
  },
  avatarBox: {
    width: '85%',
    alignItems: 'center',
  },
  modal: {
    padding: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    flex: 1,
    height: 50,
    marginTop: 20,
  },
});

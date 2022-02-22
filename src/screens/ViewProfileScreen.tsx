import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Center, Button, Container, Avatar } from 'native-base';
import { URL } from '@env';

import EventCard from '../components/EventCard';

const ViewProfileScreen = ({ route }: any) => {
  const [profile, setProfile] = useState<any>();

  const fetchProfile = async () => {
    const response = await fetch(`${URL}/api/users/${route.params.id}`);
    const json = await response.json();
    setProfile(json.data);
  };

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, []);

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
            >
              5.1
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
              17
            </Button>
          </Center>
        </View>
      </Center>
      <Container>
        <Text fontSize="xl" fontWeight="bold" p={4}>
          Upcoming events
        </Text>
      </Container>
      <EventCard />
      <EventCard />
      <EventCard />
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

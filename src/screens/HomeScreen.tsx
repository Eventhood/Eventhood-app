import { ScrollView } from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import { useEffect, useState } from 'react';
import { Text, Container, Center, Heading } from 'native-base';
import { URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';

import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState<any>();
  const isFocused = useIsFocused();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${URL}/api/events`);
        const jsonRes = await res.json();

        if ('data' in jsonRes) setEventList(jsonRes.data);
      } catch (e) {
        console.log('error on fetch post');
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
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Heading padding={5}>
            <Text fontSize="3xl" fontWeight="bold" padding={6}>
              EVENTHOOD
            </Text>
          </Heading>
        </Container>

        <SearchBar navigation={navigation} path="Search-b" />

        <Text fontSize="xl" fontWeight="bold" pl={6}>
          Recommended events
        </Text>
        {eventList.length != 0 ? (
          eventList.map((event: any, key) => {
            return (
              <EventCard navigation={navigation} key={key} eventInfo={event} location={location} />
            );
          })
        ) : (
          <Center>
            <Text fontSize="lg" fontWeight="semibold" m={8}>
              No Result
            </Text>
          </Center>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

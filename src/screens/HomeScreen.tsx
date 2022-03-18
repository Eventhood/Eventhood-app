import { StyleSheet, ScrollView } from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import { app } from '../utils/firebase';
import { getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, Container, Box, Heading, Slider } from 'native-base';
import { URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const auth = getAuth(app);

const HomeScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>();
  const isFocused = useIsFocused();

  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    setUser(auth.currentUser);
    (async () => {
      try {
        const res = await fetch(`${URL}/api/events`);
        const jsonRes = await res.json();

        setEventList(jsonRes.data);

      } catch (e) {
        console.log('error on fetch post');
      }
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

        <SearchBar navigation={navigation} />

        <Box mx={5} width="80%">
          <Slider defaultValue={15} minValue={0} maxValue={100} step={10}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Box>
        <Text fontSize="xl" fontWeight="bold" padding={6}>
          Recommended events
        </Text>
        {eventList.length
          ? eventList.map((event: any, key) => {
              return <EventCard navigation={navigation} key={key} eventInfo={event} />;
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

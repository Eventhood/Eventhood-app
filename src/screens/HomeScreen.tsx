import { StyleSheet, ScrollView } from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import { app } from '../utils/firebase';
import { getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, Container, Box, Heading, Slider } from 'native-base';

import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

const auth = getAuth(app);

const HomeScreen = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(auth.currentUser);
  });

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
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

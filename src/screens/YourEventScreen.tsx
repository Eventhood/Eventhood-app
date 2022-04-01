import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Center, Icon, Fab } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';

import { app } from '../utils/firebase';
import { URL } from '@env';
import YourEventCard from '../components/YourEventCard';

const auth = getAuth(app);

const YourEventScreen = ({ navigation }: any) => {
  const [eventList, setEventList] = useState([]);
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        });
        const jsonRes = await res.json();
        const resEvent = await fetch(`${URL}/api/events/user/${jsonRes.data._id}`);
        const jsonResEvent = await resEvent.json();
        setEventList(jsonResEvent.data);
      } catch (e) {
        setError('Services Unavailable');
      }
    })();
    return () => {
      setEventList([]);
    };
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
    <View style={styles.view}>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        bg={'#ffffff'}
        icon={<Icon color="black" as={AntDesign} name="plus" size="sm" />}
        onPress={() => {
          navigation.navigate('CreateEvent');
        }}
      />
      <ScrollView>
        {!error ? (
          <>
            <Text fontSize="xl" fontWeight="semibold" padding={4}>
              Your upcoming created event
            </Text>
            {eventList ? (
              eventList.length > 0 ? (
                eventList.map((event, key) => {
                  return (
                    <YourEventCard
                      navigation={navigation}
                      eventInfo={event}
                      key={key}
                      location={location}
                    ></YourEventCard>
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
          </>
        ) : (
          <Center>
            <Text fontSize="lg" color="#ef4444" fontWeight="semibold">
              {error}
            </Text>
          </Center>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
  },
});
export default YourEventScreen;

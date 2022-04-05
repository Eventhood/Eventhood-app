import { Text, Box, Image } from 'native-base';
import { StyleSheet, View, ScrollView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { URL } from '@env';
import * as Location from 'expo-location';

import EventCard from '../components/EventCard';
import SafeAreaView from '../components/SafeAreaView';
import { useEffect, useState } from 'react';

const SearchCategoryScreen = ({ navigation, route }: any) => {
  const isFocused = useIsFocused();
  const [eventList, setEventList] = useState([]);
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        console.log(route.params.catInfo._id);
        const res = await fetch(`${URL}/api/events/category/${route.params.catInfo._id}`);
        const jsonRes = await res.json();
        setEventList(jsonRes.data);
      } catch (e) {
        console.log('error on fetch post');
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
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>
        <Box>
          <Image
            source={
              route.params.catInfo
                ? { uri: route.params.catInfo.header }
                : require('../assets/logo.png')
            }
            alt="image"
            width="full"
            height={200}
          />
          <View style={styles.darkness}>
            <Box style={styles.headerBox}>
              <Ionicons
                name="chevron-back-circle-outline"
                size={28}
                color="white"
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Box>
                <Text color="white" fontSize={'lg'} bold letterSpacing={'2xl'}>
                  {route.params.catInfo.name}
                </Text>
              </Box>
            </Box>
          </View>
        </Box>

        {eventList.length
          ? eventList.map((event: any, key) => {
              return (
                <EventCard
                  navigation={navigation}
                  key={key}
                  eventInfo={event}
                  location={location}
                />
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};
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
  headerBox: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    margin: 12,
  },
});
export default SearchCategoryScreen;

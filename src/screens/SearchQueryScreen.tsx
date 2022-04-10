import React, { useEffect, useState } from 'react';
import { Text, Center, Input, Icon } from 'native-base';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';
import { URL } from '@env';
import SafeAreaView from '../components/SafeAreaView';

import EventCard from '../components/EventCard';

const SearchQueryScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [eventList, setEventList] = useState([]);
  const [result, setResult] = useState('');
  const [location, setLocation] = useState<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const debounce = setTimeout(() => {
      (async () => {
        if (query.length > 0) {
          console.log(query);
          const res = await fetch(`${URL}/api/events/search?query=${query}`);
          const jsonRes = await res.json();
          if ('data' in jsonRes) {
            setResult('');
            setEventList(jsonRes.data);
          } else {
            setResult('No result');
          }
        }
      })();
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

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
    <>
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-sharp" size={50} color="black" />
          </TouchableWithoutFeedback>
          <>
            <Input
              placeholder="Search"
              variant="filled"
              width="75%"
              bg="white"
              size="lg"
              height={55}
              value={query}
              borderRadius={30}
              onChangeText={(text) => {
                setQuery(text);
              }}
              InputLeftElement={
                <Icon as={<MaterialIcons name="search" />} ml="5" size={30} color="black" />
              }
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name="clear"
                      onPress={() => {
                        setQuery('');
                        setEventList([]);
                      }}
                    />
                  }
                  mr="5"
                  size={6}
                  color="black"
                />
              }
            />
          </>
        </View>

        <ScrollView>
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

          {result ? (
            <Center>
              <Text fontSize="xl" fontWeight="bold" mt={6}>
                {result}
              </Text>
            </Center>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
});
export default SearchQueryScreen;

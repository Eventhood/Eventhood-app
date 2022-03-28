import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Fab, Icon, Center, HStack, Stack, Avatar } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { app } from '../utils/firebase';
import { URL } from '@env';
import RatingCard from '../components/RatingCard';

const auth = getAuth(app);

const RatingScreen = ({ route, navigation }: any) => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<any>();
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        });
        const jsonRes = await res.json();
        setProfile(jsonRes.data);

        const resRating = await fetch(`${URL}/api/ratings/${route.params.host._id}`);
        const jsonResRating = await resRating.json();
        setRatingList(jsonResRating.data);
        console.log(jsonResRating.data);
      } catch (e) {
        console.log('Services Unavailable');
      }
    })();
  }, [isFocused]);

  return (
    <View style={styles.view}>
      <ScrollView>
        <View>
          {ratingList.length !== 0 ? (
            ratingList.map((rating, key) => {
              return <RatingCard ratingInfo={rating} key={key} />;
            })
          ) : (
            <Center>
              <Text fontSize="lg">No Rating</Text>
            </Center>
          )}
        </View>
      </ScrollView>
      {profile ? (
        profile._id !== route.params.host._id ? (
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            bg={'#ffffff'}
            icon={<Icon color="black" as={AntDesign} name="plus" size="sm" />}
            onPress={() => {
              navigation.navigate('RateUser', { host: route.params.host, profile: profile });
            }}
          />
        ) : null
      ) : null}
    </View>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
  },
});

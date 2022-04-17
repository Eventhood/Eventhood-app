import { Avatar, Text, Button, ScrollView, Box, Modal, Center, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

import { URL } from '@env';
import { app } from '../utils/firebase';

const auth = getAuth(app);

const FollowingScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [followings, setFollowings] = useState<any>([]);
  const [userUUID, setUserUUID] = useState('');
  const [showModal2, setShowModal2] = useState(false);

  const unFollowHandler = async (followingId: string) => {
    try {
      const res = await fetch(`${URL}/api/follows/${followingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });

      const followings = await fetch(`${URL}/api/follows/following/${userUUID}`);

      const jsonResFollowing = await followings.json();
      setShowModal2(true);
      if ('data' in jsonResFollowing) {
        setFollowings(jsonResFollowing.data);
      } else {
        setFollowings([]);
      }
    } catch (e) {
      console.log(e);
    }
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

        const followings = await fetch(`${URL}/api/follows/following/${jsonResUser.data._id}`);
        const jsonResFollowing = await followings.json();
        if ('data' in jsonResFollowing) {
          setFollowings(jsonResFollowing.data);
        } else {
          setFollowings([]);
        }
      } catch (e) {
        console.log('error on fetch post');
      }
    })();
  }, [isFocused]);

  return (
    <View>
      <ScrollView>
        {followings.length !== 0 ? (
          followings.map((following: any, key: any) => {
            return (
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#D1D5DB75"
                onPress={() =>
                  navigation.navigate('OtherUserProfile', { host: following.following })
                }
              >
                <Box p={4} style={styles.avatarBox} shadow={'4'} key={key}>
                  <Box style={styles.avatarLeftBox}>
                    <Avatar source={{ uri: following.following.photoURL }} shadow={'6'}>
                      AK
                    </Avatar>
                    <VStack space={2}>
                      <Text ml={4} isTruncated maxW="200">
                        {following.following.displayName}
                      </Text>
                      <Text ml={4} isTruncated maxW="200">
                        @{following.following.accountHandle}
                      </Text>
                    </VStack>
                  </Box>
                  <Center>
                    <Button
                      style={styles.unFollow}
                      _text={{
                        color: 'black',
                        textAlign: 'center',
                      }}
                      shadow={'4'}
                      onPress={() => unFollowHandler(following._id)}
                    >
                      Unfollow
                    </Button>
                  </Center>
                </Box>
              </TouchableHighlight>
            );
          })
        ) : (
          <Center>
            <Text fontSize="lg" m={5}>
              No Following
            </Text>
          </Center>
        )}
      </ScrollView>
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
                User unfollow.
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
    </View>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  unFollow: {
    marginTop: 15,
    width: '65%',
    height: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#EF4444',
  },
  button: {
    backgroundColor: '#3B82F6',
    flex: 1,
    height: 50,
    marginTop: 20,
  },
  modal: {
    padding: 10,
  },
  avatarBox: {
    margin: 20,
    display: 'flex',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: '#00000050',
  },
  avatarLeftBox: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
});

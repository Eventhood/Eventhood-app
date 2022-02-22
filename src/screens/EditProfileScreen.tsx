import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Center, Box } from 'native-base';
import { getAuth } from 'firebase/auth';
import { URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

import { app } from '../utils/firebase';

const auth = getAuth(app);

import EditUserInputBox from '../components/EditUserInputBox';

const EditProfileScreen = ({ navigation }: any) => {
  // const [image, setImage] = useState('');
  const [userBasicInfo, setUserBasicInfo] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };
  const isFocused = useIsFocused();

  const getUserInfo = async () => {
    const response = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`);
    const json = await response.json();
    setUserBasicInfo(json.data);
  };

  useEffect(() => {
    setUserInfo({
      uuid: auth.currentUser?.uid,
      displayName: auth.currentUser?.providerData[0].displayName,
      photoURL: auth.currentUser?.providerData[0].photoURL,
      email: auth.currentUser?.providerData[0].email,
    });
    (async () => {
      await getUserInfo();
    })();
  }, [isFocused]);

  return (
    <View>
      <Center my={8}>
        <TouchableWithoutFeedback>
          <Avatar
            size="xl"
            shadow="7"
            bg="indigo.500"
            source={
              userInfo ? { uri: userInfo.photoURL } : require('../assets/default_profile_pic.jpg')
            }
          ></Avatar>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback onPress={pickImage}>
          <MaterialCommunityIcons
            style={styles.profileImageEdit}
            name="pencil"
            size={25}
            color="#D1D5DB"
          />
        </TouchableWithoutFeedback> */}
      </Center>

      <Box>
        <EditUserInputBox
          title="Username"
          value={userBasicInfo ? userBasicInfo.accountHandle : ''}
          navigation={navigation}
          id={userBasicInfo ? userBasicInfo._id : ''}
          route="EditUsername"
        />
        <EditUserInputBox
          title="Full Name"
          value={userInfo ? userInfo.displayName : ''}
          navigation={navigation}
          route="EditFullname"
          id={userBasicInfo ? userBasicInfo._id : ''}
        />
        <EditUserInputBox
          title="Email"
          value={userInfo ? userInfo.email : ''}
          navigation={navigation}
          route="EditEmail"
          id={userBasicInfo ? userBasicInfo._id : ''}
        />
        <EditUserInputBox
          title="Password"
          value="************"
          navigation={navigation}
          route="EditPassword"
          id={userBasicInfo ? userBasicInfo._id : ''}
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageEdit: {
    position: 'relative',
    bottom: 25,
    left: 55,
  },
});
export default EditProfileScreen;

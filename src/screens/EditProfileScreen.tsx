import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Center, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import EditUserInputBox from '../components/EditUserInputBox';

const EditProfileScreen = ({ navigation }: any) => {
  const [image, setImage] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Center my={4}>
        <TouchableWithoutFeedback onPress={pickImage}>
          <Avatar
            size="xl"
            shadow="7"
            bg="indigo.500"
            source={image ? { uri: image } : require('../assets/default_profile_pic.jpg')}
          ></Avatar>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={pickImage}>
          <MaterialCommunityIcons
            style={styles.profileImageEdit}
            name="pencil"
            size={25}
            color="#D1D5DB"
          />
        </TouchableWithoutFeedback>
      </Center>

      <Box>
        <EditUserInputBox
          title="Username"
          value="Hello_world"
          navigation={navigation}
          route="EditUsername"
        />
        <EditUserInputBox
          title="Full Name"
          value="Hello World"
          navigation={navigation}
          route="EditFullname"
        />
        <EditUserInputBox
          title="Phone Number"
          value="+1 647 777 7777"
          navigation={navigation}
          route="EditPhoneNumber"
        />
        <EditUserInputBox
          title="Email"
          value="helloWorld@gmail.com"
          navigation={navigation}
          route="EditEmail"
        />
        <EditUserInputBox
          title="Password"
          value="************"
          navigation={navigation}
          route="EditPassword"
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

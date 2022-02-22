import { StyleSheet } from 'react-native';
import { Avatar, Flex, Center, Text } from 'native-base';

const MenuProfileCard = ({ navigation, userData }: any) => {
  return (
    <Flex style={styles.profileContainer} direction="row">
      <Avatar
        bg="gray.500"
        size="lg"
        shadow={5}
        source={
          userData
            ? userData.photoURL
              ? { uri: userData.photoURL }
              : require('../assets/default_profile_pic.jpg')
            : require('../assets/default_profile_pic.jpg')
        }
      ></Avatar>
      <Center px="5">
        <Flex direction="column">
          <Text my="1" fontWeight="bold">
            {userData ? userData.displayName : ''}
          </Text>
          <Text
            style={styles.profileLink}
            onPress={() => navigation.navigate('EditProfile-m', { screen: 'EditProfile' })}
          >
            Edit Profile
          </Text>
        </Flex>
      </Center>
    </Flex>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderBottomColor: '#64748B25',
    borderBottomWidth: 2,
  },
  profileLink: {
    color: '#3B82F6',
  },
});

export default MenuProfileCard;

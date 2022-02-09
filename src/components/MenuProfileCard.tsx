import { StyleSheet } from 'react-native';
import { Avatar, Flex, Center, Text } from 'native-base';

const MenuProfileCard = ({ navigation }: any) => {
  return (
    <Flex style={styles.profileContainer} direction="row">
      <Avatar
        bg="gray.500"
        size="lg"
        shadow={5}
        source={{
          uri: 'https://cdn.donmai.us/sample/4f/24/__shinei_nouzen_86_eightysix_drawn_by_shirabi__sample-4f24cabfc060f43dfc9d782f71e852f5.jpg',
        }}
      ></Avatar>
      <Center px="5">
        <Flex direction="column">
          <Text my="1" fontWeight="bold">
            Name
          </Text>
          <Text style={styles.profileLink} onPress={() => navigation.push('EditProfile')}>
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

import { StyleSheet } from 'react-native';
import { Box, Avatar, Flex, Center, Text } from 'native-base';

const MenuNavigationLink = ({ name, icon }: { name: string; icon: any }) => {
  return (
    <Flex direction="row" px={5}>
      <Center pr={5}>{icon}</Center>
      <Flex style={styles.links}>
        <Text fontWeight="semibold" color="#1E293B">
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  links: {
    borderBottomColor: '#64748B25',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 25,
    paddingTop: 25,
  },
});

export default MenuNavigationLink;

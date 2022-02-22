import { Text, Button, Flex } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const SearchBar = ({ navigation }: any) => {
  return (
    <Button
      style={styles.searchBar}
      onPress={() => {
        navigation.navigate('Search-b');
      }}
    >
      <Flex flexDirection={'row'}>
        <MaterialIcons name="search" size={24} color="#D1D5DB" />
        <Text color="#D1D5DB">Search</Text>
      </Flex>
    </Button>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 75,
    marginHorizontal: 25,
    marginBottom: 25,
  },
});

export default SearchBar;

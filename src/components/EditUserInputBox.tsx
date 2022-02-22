import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Center, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditUserInputBox = ({
  title,
  value,
  navigation,
  route,
  id,
}: {
  title: string;
  value: string;
  navigation: any;
  route: string;
  id: string;
}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#D1D5DB75"
      onPress={() => navigation.navigate(route, { value, id })}
    >
      <Box style={styles.box}>
        <Box>
          <Text fontSize="sm" color="#D1D5DB">
            {title}
          </Text>
          <Text fontSize="lg">{value}</Text>
        </Box>
        <Center>
          <MaterialCommunityIcons name="pencil" size={25} color="#D1D5DB" />
        </Center>
      </Box>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    backgroundColor: '#ffffff',
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D1D5DB75',
    borderBottomWidth: 1,
  },
});
export default EditUserInputBox;

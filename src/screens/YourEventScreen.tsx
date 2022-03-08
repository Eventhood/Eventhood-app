import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Icon, Fab } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import YourEventCard from '../components/YourEventCard';

const YourEventScreen = ({ navigation }: any) => {
  return (
    <View>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        bg={'#ffffff'}
        icon={<Icon color="black" as={AntDesign} name="plus" size="sm" />}
        onPress={() => {
          navigation.navigate('CreateEvent');
        }}
      />
      <ScrollView>
        <Text fontSize="xl" fontWeight="semibold" padding={4}>
          Your upcoming created event
        </Text>

        <YourEventCard navigation={navigation}></YourEventCard>
        <YourEventCard navigation={navigation}></YourEventCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  createButton: {
    position: 'relative',
    bottom: 25,
    left: 55,
  },
});
export default YourEventScreen;

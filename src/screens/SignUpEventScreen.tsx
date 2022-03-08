import { View, ScrollView } from 'react-native';
import { Text } from 'native-base';
import RegisteredEventCard from '../components/RegisteredEventCard';

const SignUpEventScreen = () => {
  return (
    <ScrollView>
      <Text fontSize="xl" fontWeight="semibold" padding={4}>
        Your upcoming event
      </Text>
      <RegisteredEventCard />
      <RegisteredEventCard />
      <RegisteredEventCard />
    </ScrollView>
  );
};

export default SignUpEventScreen;

import { Text, Box, Stack, Heading, Image, AspectRatio, HStack } from 'native-base';
import { TouchableHighlight } from 'react-native';

const EventCard = ({ navigation }: any) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#D1D5DB75"
      onPress={() => navigation.navigate('EventDetail', { id: 'MyID' })}
    >
      <Box padding={5}>
        <AspectRatio ratio={16 / 9}>
          <Image
            roundedTop="lg"
            source={{
              uri: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=maxhttps://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            }}
            alt="image"
          />
        </AspectRatio>

        <Stack p={4} space={2} backgroundColor="#ffffff" shadow={4}>
          <Stack space={10}>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Heading size="md">Event title</Heading>
              </HStack>
              <HStack alignItems="center">
                <Text ml={1} color="gray.500" fontWeight="500">
                  20Km
                </Text>
              </HStack>
            </HStack>
          </Stack>
          <Text>
            Short Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit ...
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text ml={1} color="gray.500" fontWeight="500">
                Created by @Username
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text ml={1} color="gray.500" fontWeight="500">
                Max Participants 8
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </TouchableHighlight>
  );
};

export default EventCard;

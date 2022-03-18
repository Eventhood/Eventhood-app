import { Text, Box, Stack, Heading, Image, AspectRatio, HStack } from 'native-base';
import { TouchableHighlight } from 'react-native';

const EventCard = ({ navigation, eventInfo }: any) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#D1D5DB75"
      onPress={() => navigation.navigate('EventDetail', { id: eventInfo._id })}
    >
      <Box padding={6}>
        <Image
          roundedTop="lg"
          source={{
            uri: eventInfo.category.header,
          }}
          alt="image"
          width="full"
          height={150}
        />
        <Stack p={4} space={2} backgroundColor="#ffffff">
          <Stack space={10}>
            <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Heading size="md">{eventInfo.name}</Heading>
              </HStack>
              <HStack alignItems="center">
                <Text ml={1} color="gray.500" fontWeight="500">
                  20 Km
                </Text>
              </HStack>
            </HStack>
          </Stack>
          <Text>{eventInfo.description}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text ml={1} color="gray.500" fontWeight="500">
                Created by @{eventInfo.host.accountHandle}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text ml={1} color="gray.500" fontWeight="500">
                Max Participants {eventInfo.maxParticipants}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </TouchableHighlight>
  );
};

export default EventCard;

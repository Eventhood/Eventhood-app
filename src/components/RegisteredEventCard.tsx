import { StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Box, Stack, Heading, Image, Button, HStack, Flex } from 'native-base';
import { distance } from '../utils/location';

const RegisteredEventCard = ({ navigation, eventInfo, location }: any) => {
  return (
    <>
      <Image
        roundedTop="lg"
        source={{
          uri: eventInfo.event.category.header,
        }}
        alt="image"
        width="full"
        height={150}
      />
      <Stack p={4} space={2} backgroundColor="#ffffff">
        <Stack space={10}>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Heading size="md">{eventInfo ? eventInfo.event.name : ''}</Heading>
            </HStack>
            <HStack alignItems="center">
              <Text ml={1} color="gray.500" fontWeight="500">
                {location
                  ? `${distance(
                      eventInfo.event.location.lat,
                      location.coords.latitude,
                      eventInfo.event.location.lon,
                      location.coords.longitude
                    )} Km`
                  : null}
              </Text>
            </HStack>
          </HStack>
        </Stack>
        <Text>{eventInfo ? eventInfo.event.description : ''}</Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text ml={1} color="gray.500" fontWeight="500">
              {eventInfo ? `Created by @${eventInfo.event.host.displayName}` : ''}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Text ml={1} color="gray.500" fontWeight="500">
              Max Participants {eventInfo ? eventInfo.event.maxParticipants : ''}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </>
  );
};

export default RegisteredEventCard;

import { StyleSheet } from 'react-native';
import { Text, Box, Stack, Heading, Image, Button, HStack } from 'native-base';
import { distance } from '../utils/location';

const YourEventCard = ({ navigation, eventInfo, location }: any) => {
  return (
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
                {location
                  ? `${distance(
                      eventInfo.location.lat,
                      location.coords.latitude,
                      eventInfo.location.lon,
                      location.coords.longitude
                    )} Km`
                  : null}
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
      <HStack>
        <Button
          style={styles.buttonEdit}
          _text={{
            fontWeight: 'semibold',
          }}
          onPress={() => navigation.navigate('EditEvent', { id: eventInfo._id })}
        >
          Edit Event
        </Button>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonEdit: {
    backgroundColor: '#27272A',
    flex: 1,
    height: 40,
    borderRadius: 0,
  },
});
export default YourEventCard;

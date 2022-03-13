import { StyleSheet } from 'react-native';
import { Text, Box, Stack, Heading, Image, Button, HStack, Flex } from 'native-base';

const RegisteredEventCard = () => {
  return (
    <Box padding={6}>
      <Image
        roundedTop="lg"
        source={{
          uri: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        }}
        alt="image"
        width="full"
        height={150}
      />
      <Stack p={4} space={2} backgroundColor="#ffffff">
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
        <Text>Short Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit ...</Text>
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
      <HStack>
        <Button
          style={styles.buttonUnregister}
          _text={{
            fontWeight: 'semibold',
          }}
        >
          Unregister
        </Button>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonUnregister: {
    backgroundColor: '#EF4444',
    flex: 1,
    height: 40,
    borderRadius: 0,
  },
});

export default RegisteredEventCard;

import React from 'react';
import { Text, Box, HStack, Stack, Avatar } from 'native-base';

const RatingCard = ({ ratingInfo }: any) => {
  return (
    <Box paddingLeft={10} paddingRight={10} paddingBottom={6} paddingTop={6}>
      <Stack p={2} borderTopRadius={30} backgroundColor="black" space={2}>
        <Stack space={10}>
          <HStack>
            <Avatar
              size="sm"
              source={
                ratingInfo
                  ? { uri: ratingInfo.ratedBy.photoURL }
                  : require('../assets/default_profile_pic.jpg')
              }
            >
              AK
            </Avatar>
            <Text ml={1} alignItems="center" color="white" fontSize="xl" fontWeight="500">
              {ratingInfo ? `@${ratingInfo.ratedBy.accountHandle}` : ''}
            </Text>
          </HStack>
        </Stack>
      </Stack>
      <Stack p={2} borderBottomRadius={30} backgroundColor="white" space={2}>
        <Stack backgroundColor="white" alignItems="center">
          <HStack>
            <Text fontSize="lg" color="black" fontWeight="500">
              {ratingInfo ? `+${ratingInfo.rating} rate` : ''}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RatingCard;

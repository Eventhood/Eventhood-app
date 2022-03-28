import { Button, Center, Box, Slider, Text } from 'native-base';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { URL } from '@env';

const RatingScrollScreen = ({ route, navigation }: any) => {
  const [onChangeValue, setOnChangeValue] = useState(1);
  const handleSubmitRating = async () => {
    try {
      await fetch(`${URL}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ratingData: {
            userRated: route.params.host._id,
            ratedBy: route.params.profile._id,
            rating: onChangeValue,
          },
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <View>
        <Text ml={4} fontWeight="500" fontSize={'lg'}>
          Select Rating: {onChangeValue}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Box paddingTop={10} paddingBottom={10} mx={6} top="1" width="90%">
          <Slider
            defaultValue={1}
            minValue={1}
            maxValue={5}
            onChange={(v) => {
              setOnChangeValue(v);
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Box>
      </View>

      <Center>
        <View style={styles.btn}>
          <Button
            style={styles.SubmitButton}
            shadow={4}
            onPress={async () => {
              await handleSubmitRating();
              navigation.goBack();
            }}
            _text={{
              color: 'black',
            }}
          >
            Submit Rating
          </Button>
        </View>
      </Center>
    </View>
  );
};

export default RatingScrollScreen;

const styles = StyleSheet.create({
  btn: {
    paddingTop: 30,
    paddingRight: 2,
    position: 'absolute',
  },
  SubmitButton: {
    top: 110,
    width: 180,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
  },
});

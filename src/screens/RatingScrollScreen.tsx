import { Button, Center, Box, Slider } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

const RatingScrollScreen = () => {
  return (
    <View>
      <View>
        <Text style={styles.txtalign}> Select Rating </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Box paddingTop={10} paddingBottom={10} mx={6} top="1" width="80%">
          <Slider defaultValue={60} minValue={0} maxValue={100} step={20}>
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

  txtalign: {
    top: 30,
    left: 50,
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

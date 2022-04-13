import { View } from 'react-native';
import { Text, Box } from 'native-base';

const AboutScreen = () => {
  return (
    <View>
      <Box p={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          What is Eventhood, you ask?
        </Text>
        <Text mb={4}>
          We are a platform designed to bring communities together, a place which can be used as a
          one-stop-shop for all things local. You can browse events being held in your local area,
          register to them to indicate your attendance and interest, as well as signing up for
          updates about the event in the case that the plan changes!
        </Text>
        <Text mb={2}>
          The COVID-19 pandemic has hit everyone hard, and with lockdowns and restrictions many
          people may feel isolated from their community, friends, and family. It’s time to restore
          those ties, and to truly engage with your community even more than before. With Eventhood,
          we hope to make that process easy to navigate, and help you take those first steps.
        </Text>
        <Text mb={2}>Eventhood, bringing communities back together.</Text>
      </Box>
    </View>
  );
};

export default AboutScreen;

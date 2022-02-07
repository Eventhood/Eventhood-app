import { ScrollView } from 'react-native';
import { Box, Text } from 'native-base';

const QuestionScreen = ({ route }: any) => {
  return (
    <ScrollView>
      <Box mt={8} mb={4} ml={4}>
        <Text fontSize="lg" fontWeight="semibold">
          {route.params.question}
        </Text>
      </Box>
      <Box ml={4} px={4} mb={4}>
        <Text>{route.params.answer}</Text>
      </Box>
    </ScrollView>
  );
};

export default QuestionScreen;

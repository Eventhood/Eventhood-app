import { StyleSheet } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuestionCard = ({ name }: { name: string }) => {
  return (
    <Box style={styles.topicCard} p={4} my={0.4}>
      <Flex direction="row">
        <Box mr={2}>
          <MaterialCommunityIcons name="file-document" size={30} color="#1e293b" />
        </Box>
        <Box style={styles.topicCardName}>
          <Text>{name}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  topicCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicCardName: {
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
  },
});

export default QuestionCard;

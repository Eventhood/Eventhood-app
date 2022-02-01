import { StyleSheet } from 'react-native';
import { Box, Flex, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const TopicCard = ({ name }: { name: string }) => {
  return (
    <Box style={styles.topicCard} p={4} my={0.4}>
      <Flex direction="row">
        <Box mr={2}>
          <MaterialIcons name="format-list-bulleted" size={30} color="#1e293b" />
        </Box>
        <Box style={styles.topicCardName}>
          <Text isTruncated maxW="85%">
            {name}
          </Text>
        </Box>
      </Flex>
      <MaterialIcons name="arrow-forward-ios" size={30} color="#1e293b" />
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
export default TopicCard;

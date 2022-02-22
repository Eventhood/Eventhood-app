import { TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Text, Center } from 'native-base';
import { URL } from '@env';

import TopicCard from '../components/TopicCard';
interface Topic {
  _id: string;
  name: string;
}

const HelpScreen = ({ navigation }: any) => {
  const [topics, setTopics] = useState<Topic[] | undefined>();

  const fetchTopics = async () => {
    const response = await fetch(`${URL}/api/faqtopics`);
    const json = await response.json();
    setTopics(json.data);
  };

  useEffect(() => {
    (async () => {
      await fetchTopics();
    })();
  }, []);

  return (
    <ScrollView>
      <Box mt={8} mb={4} ml={4}>
        <Text fontSize="xl" fontWeight="semibold">
          Topics
        </Text>
      </Box>
      {topics ? (
        topics.map((topic, key) => {
          return (
            <TouchableHighlight
              key={key}
              activeOpacity={0.5}
              underlayColor="#D1D5DB75"
              onPress={() =>
                navigation.push('Topic-m', {
                  screen: 'Topic',
                  params: { topic },
                })
              }
            >
              <TopicCard name={topic.name} />
            </TouchableHighlight>
          );
        })
      ) : (
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            No Topic
          </Text>
        </Center>
      )}
      <Center m={12}>
        <Text
          style={styles.contactUsLinks}
          fontSize="lg"
          fontWeight="semibold"
          onPress={() => navigation.push('ContactUs')}
        >
          Contact us
        </Text>
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactUsLinks: {
    color: '#3B82F6',
  },
});
export default HelpScreen;

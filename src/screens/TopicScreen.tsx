import { TouchableHighlight, ScrollView } from 'react-native';
import { Box, Center, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { URL } from '@env';

import QuestionCard from '../components/QuestionCard';

interface Question {
  _id: string;
  name: string;
  topic: {
    _id: string;
    name: string;
  };
  question: string;
  answer: string;
}

const TopicScreen = ({ route, navigation }: any) => {
  const [questions, setQuestions] = useState<Question[] | undefined>();

  const fetchQuestions = async () => {
    const response = await fetch(`${URL}/api/faqquestions/${route.params.topic._id}`);
    const json = await response.json();
    setQuestions(json.data);
  };

  useEffect(() => {
    (async () => {
      await fetchQuestions();
    })();
  }, []);

  return (
    <ScrollView>
      <Box mt={8} mb={4} ml={4}>
        <Text fontSize="xl" fontWeight="bold">
          {route.params.topic.name}
        </Text>
      </Box>
      {questions ? (
        questions.map((question, key) => {
          return (
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="#D1D5DB75"
              key={key}
              onPress={() =>
                navigation.push('Question', {
                  question: question.question,
                  answer: question.answer,
                })
              }
            >
              <QuestionCard name={question.question} />
            </TouchableHighlight>
          );
        })
      ) : (
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            No Question
          </Text>
        </Center>
      )}
    </ScrollView>
  );
};

export default TopicScreen;

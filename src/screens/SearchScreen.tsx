import { Text, Box, Input, Center, VStack, Icon } from 'native-base';
import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { app } from '../utils/firebase';
import { URL } from '@env';
import ErrorMessage from '../components/ErrorMessage';

const auth = getAuth(app);

const SearchScreen = ({ navigation }: any) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${URL}/api/eventcategories/`);
      const jsonRes = await response.json();

      setCategory(jsonRes.data);
    })();
  }, []);

  const [error] = useState('');
  return (
    <ScrollView>
      <VStack paddingTop={10} position="absolute">
        <Ionicons
          name="chevron-back-sharp"
          size={50}
          color="black"
          paddingLeft={4}
          paddingTop={2}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </VStack>

      <VStack paddingTop={10} paddingRight={2} width="100%">
        <View>
          <Center>
            <VStack width="80%" space={2}>
              <Input
                placeholder="Search"
                variant="filled"
                width="100%"
                bg="white"
                size="lg"
                height={55}
                left={5}
                borderRadius={30}
                px={2}
                _web={{
                  _focus: {
                    borderColor: 'white',
                    style: {},
                  },
                }}
                InputLeftElement={
                  <Icon as={<MaterialIcons name="search" />} ml="5" size={30} color="black" />
                }
                InputRightElement={
                  <Icon as={<MaterialIcons name="clear" />} mr="5" size={6} color="black" />
                }
              />
            </VStack>
          </Center>
        </View>
      </VStack>

      <Box p={4}>
        <Box mt={3}>
          <Text fontSize={'lg'} mb="4">
            Top Categories
          </Text>
          <ErrorMessage error={error} visible={error ? true : false} />

          <View style={styles.container}>
            <Text>
              {category ? (
                category.map((category: any) => {
                  return (
                    <View style={styles.box}>
                      <ImageBackground
                        style={{ borderRadius: 10 }}
                        source={{
                          uri: 'https://c1.wallpaperflare.com/preview/1009/569/89/airport-fly-departure-travel.jpg',
                        }}
                      >
                        <View style={styles.inner}>
                          <Text color="white" fontSize={20}>
                            {category.name}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                })
              ) : (
                <Text color="white" fontSize={20}>
                  No Category
                </Text>
              )}
            </Text>
          </View>
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'green',
  },
  box: {
    width: '50%',
    height: '55%',
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
  },

  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default SearchScreen;

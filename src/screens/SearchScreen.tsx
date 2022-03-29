import { Text, Box, TextArea, Input, Button, CheckIcon, Select, Center, VStack, Icon, Flex } from 'native-base';
import { StyleSheet, View, ScrollView} from 'react-native';
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
      
      <VStack justifyContent='space-between' paddingTop={16} space={8} width="100%" >
      <Ionicons name="chevron-back-sharp"  size={50} color="black" paddingLeft={4} paddingTop={2} 
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />              
    <VStack   width="100%" >
      <View >
   
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
              py={1}
              
              px={2}
              _web={{
                _focus: {
                  borderColor: 'white',
                  style: {},
                },
              }}
              InputLeftElement={<Icon as={<MaterialIcons name="search"/>} ml="5" size={30} color="black" />}
              InputRightElement={<Icon as={<MaterialIcons name="clear"/>} mr="5" size={6} color="black" />}
            />
          </VStack>
        </Center>
        </View>
      </VStack>
      </VStack>
        <Box p={6}>

          <Box mt={5}>
            <Text fontSize={'lg'} mb="4">
              Top Categories
            </Text>
            <ErrorMessage error={error} visible={error ? true : false} />
            <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.inner}>
            <Text

              minWidth="200"
              accessibilityLabel="Choose Category"  
              bg={'#ffffff'}
            >{category ? (
                category.map((category: any) => {
                  return (
                    <Text>{category.name}</Text>
                  );
                })
              ) : (
                <Text>No Category</Text>
              )}
            </Text>
            </View>
            </View>
            <View style={styles.box}>
            <View style={styles.inner}>
              <Text>Category</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
              <Text>sd</Text>
            </View>
          </View>
            </View>
            
          </Box>
        </Box>

    </ScrollView>
  );
};

const styles = StyleSheet.create({



  title2: {
    paddingLeft: 30,
    paddingBottom: 10,
    fontSize: 20,
  },

  title: {
    left: 30,
    fontSize: 20,
  },

  container: {
    top: 4,
    width: '100%',
    height: '100%',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '50%',
    height: '22%',
    padding: 10,

    justifyContent: 'center',
  },

  inner: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

});

export default SearchScreen;

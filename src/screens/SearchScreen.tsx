import { Text, Box, Input, Center, VStack, Icon } from 'native-base';
import { StyleSheet, View, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@env';

const SearchScreen = ({ navigation }: any) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`${URL}/api/eventcategories/`);
      const jsonRes = await response.json();
      setCategory(jsonRes.data);
    })();
  }, []);

  return (
    <>
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
      <ScrollView>
        <Text fontSize={'2xl'} m="4">
          Categories
        </Text>

        <View style={styles.flexContainer}>
          {category
            ? category.map((cat: any, key) => {
                return (
                  <Box m={4} key={key}>
                    <ImageBackground
                      style={styles.image}
                      source={cat ? { uri: cat.header } : require('../assets/logo.png')}
                    />
                    <View style={styles.darkness}>
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor="#D1D5DB75"
                        style={styles.centerText}
                        onPress={() => navigation.navigate('SearchCategory', { catInfo: cat })}
                      >
                        <Text color="white" fontSize={'lg'}>
                          {cat.name}
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </Box>
                );
              })
            : null}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: 160,
    height: 100,
  },
  darkness: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 160,
    height: 100,
    justifyContent: 'space-between',
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;

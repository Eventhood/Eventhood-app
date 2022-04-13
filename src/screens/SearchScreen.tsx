import { Text, Box, Input, Center, VStack, Icon } from 'native-base';
import { StyleSheet, View, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@env';
import SearchBar from '../components/SearchBar';
import SafeAreaViewTransparent from '../components/SafeAreaViewTransparent';
import SafeAreaView from '../components/SafeAreaView';
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
    <SafeAreaViewTransparent>
      <Box mt={8}>
        <SearchBar navigation={navigation} path="SearchQueryEvent" />
      </Box>

      <ScrollView>
        <Text fontSize={'2xl'} ml="4">
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
    </SafeAreaViewTransparent>
  );
};
const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 150,
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

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Text, Center, Button, Avatar, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//test 2
const DisplayEventScreen = ({ navigation, route }: any) => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: 120,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Image
          source={{
            uri: 'https://media.istockphoto.com/vectors/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-vector-id1150481340?k=20&m=1150481340&s=612x612&w=0&h=y_RdS4lPY2p7O_bh1ZhaeLLOOuSLNBaHZFMdmgdQaVE=',
          }}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'cover',
          }}
          alt="Event Picture"
        />
      </View>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#D1D5DB75"
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
        }}
        onPress={() => navigation.navigate('ReportEvent')}
      >
        <Ionicons name="flag" size={35} />
      </TouchableHighlight>
      <View>
        <Text
          style={{
            position: 'absolute',
            color: 'white',
            right: 10,
            top: 55,
          }}
        >
          30km
        </Text>
      </View>
      <Center>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text
              style={{
                right: 22,
                top: 110,
              }}
              fontSize="4xl"
              fontWeight="semibold"
            >
              Title {route.params.id}
            </Text>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              style={styles.register}
              shadow={4}
              _text={{
                color: '#3B82F6',
              }}
            >
              Register
            </Button>
          </View>
        </View>
      </Center>
      <Text
        style={{
          right: 10,
          top: 50,
        }}
        marginLeft={10}
      >
        Created By:
      </Text>
      <Center>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 55,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Avatar
                size="lg"
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                }}
              >
                AK
              </Avatar>
              <View>
                <Text marginLeft={2} marginTop={3} fontSize="xl" fontWeight="light">
                  @Username
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              style={styles.follow}
              shadow={4}
              _text={{
                color: '#3B82F6',
              }}
            >
              Follow
            </Button>
          </View>
        </View>
      </Center>
      <View
        style={{
          top: 130,
        }}
      >
        <View>
          <Text marginLeft={5} marginTop={3} fontSize="sm" fontWeight="light">
            Description:
          </Text>
          <Text marginLeft={5} marginRight={5} fontSize="sm" fontWeight="light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor nisi,
            faucibus quis neque a, congue placerat lectus. Maecenas elementum molestie elit, ac
            iaculis metus volutpat sed. Sed feugiat accumsan tempor.
          </Text>
        </View>
        <View>
          <Text marginLeft={5} marginTop={5} fontSize="sm" fontWeight="medium">
            Category: Hangout
          </Text>
          <Text marginLeft={5} marginRight={5} marginTop={2} fontSize="sm" fontWeight="medium">
            Date: November 02, 2021 at 11:30 am
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text marginLeft={5} marginRight={5} marginTop={2} fontSize="sm" fontWeight="medium">
            Max Partipants: 8
          </Text>
          <View>
            <Ionicons style={styles.max} name="people-sharp" size={15} />
          </View>
        </View>
        <View>
          <Text marginLeft={5} marginTop={5} fontSize="sm" fontWeight="medium">
            Location:
          </Text>
          <Text marginLeft={8} fontSize="sm" fontWeight="light">
            1750 Finch Ave E, North York, ON M2J 2XS
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 100,
    marginTop: 110,
  },
  register: {
    position: 'absolute',
    top: 10,
    width: 125,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  user: {},

  follow: {
    position: 'absolute',

    left: 70,
    top: 70,
    width: 100,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  max: {
    margin: 5,
    position: 'absolute',
    top: 6,
    left: 2,
    width: 15,
    height: 15,
  },
  innerText: {
    color: 'white',
    fontSize: 15,
    left: 6,
  },
  imageText: {
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    borderRadius: 30,
    top: 170,
    left: 360,
    right: 10,
    bottom: 470,
    backgroundColor: 'black',
  },
});

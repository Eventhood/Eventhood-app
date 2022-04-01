import { Avatar, Text, Button, ScrollView } from 'native-base';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const FollowingScreen = () => {
  return (
    <ScrollView>
      <View>
        <View style={{ paddingTop: 2 }}>
          <View style={{ left: 20, flexDirection: 'row' }}>
            <View style={{ top: 40, flexDirection: 'row' }}>
              <Avatar
                size="lg"
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                }}
              >
                AK
              </Avatar>
              <View style={{ justifyContent: 'space-evenly' }}>
                <Text
                  style={{
                    paddingRight: 300,
                    paddingLeft: 10,
                  }}
                  fontSize="lg"
                >
                  @Username
                </Text>
                <Text
                  style={{
                    paddingLeft: 15,
                  }}
                  fontSize="md"
                >
                  Full name
                </Text>
              </View>
            </View>
            <View style={styles.btn2}>
              <Button
                style={styles.follow}
                _text={{
                  color: 'black',
                  bottom: 1,
                  textAlign: 'center',
                }}
              >
                Follow
              </Button>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 50 }}>
          <View style={{ paddingTop: 40 }}>
            <View style={{ left: 20, flexDirection: 'row' }}>
              <View style={{ top: 40, flexDirection: 'row' }}>
                <Avatar
                  size="lg"
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                  }}
                >
                  AK
                </Avatar>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 10,
                    }}
                    fontSize="lg"
                  >
                    @Username
                  </Text>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 15,
                    }}
                    fontSize="md"
                  >
                    Full name
                  </Text>
                </View>
              </View>
              <View style={styles.btn2}>
                <Button
                  style={styles.follow}
                  _text={{
                    color: 'black',
                    bottom: 1,
                    textAlign: 'center',
                  }}
                >
                  Follow
                </Button>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 40 }}>
            <View style={{ left: 20, flexDirection: 'row' }}>
              <View style={{ top: 40, flexDirection: 'row' }}>
                <Avatar
                  size="lg"
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                  }}
                >
                  AK
                </Avatar>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 10,
                    }}
                    fontSize="lg"
                  >
                    @Username
                  </Text>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 15,
                    }}
                    fontSize="md"
                  >
                    Full name
                  </Text>
                </View>
              </View>
              <View style={styles.btn2}>
                <Button
                  style={styles.follow}
                  _text={{
                    color: 'black',
                    bottom: 1,
                    textAlign: 'center',
                  }}
                >
                  Follow
                </Button>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 40 }}>
            <View style={{ left: 20, flexDirection: 'row' }}>
              <View style={{ top: 40, flexDirection: 'row' }}>
                <Avatar
                  size="lg"
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                  }}
                >
                  AK
                </Avatar>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 10,
                    }}
                    fontSize="lg"
                  >
                    @Username
                  </Text>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 15,
                    }}
                    fontSize="md"
                  >
                    Full name
                  </Text>
                </View>
              </View>
              <View style={styles.btn2}>
                <Button
                  style={styles.follow}
                  _text={{
                    color: 'black',
                    bottom: 1,
                    textAlign: 'center',
                  }}
                >
                  Follow
                </Button>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 40 }}>
            <View style={{ left: 20, flexDirection: 'row' }}>
              <View style={{ top: 40, flexDirection: 'row' }}>
                <Avatar
                  size="lg"
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
                  }}
                >
                  AK
                </Avatar>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 10,
                    }}
                    fontSize="lg"
                  >
                    @Username
                  </Text>
                  <Text
                    style={{
                      paddingRight: 300,
                      paddingLeft: 15,
                    }}
                    fontSize="md"
                  >
                    Full name
                  </Text>
                </View>
              </View>
              <View style={styles.btn2}>
                <Button
                  style={styles.follow}
                  _text={{
                    color: 'black',
                    bottom: 1,
                    textAlign: 'center',
                  }}
                >
                  Follow
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({
  btn2: { position: 'absolute', right: 220 },

  follow: {
    position: 'absolute',
    left: 50,
    top: 55,
    width: 120,
    height: 34,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
